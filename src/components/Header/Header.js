import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import logo from '../../img/header-logo.png';
import { activeCategory } from '../../actions/categoriesAction';
import { searchTextStatus } from '../../actions/searchAction';

const DEFAULT_FORM_VALUE = {
  search: '',
};

export default function Header() {
  const cartState = useSelector((state) => state.cartReducer);
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const [searchVisible, setSearchVisible] = useState(true);
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);
  const navigate = useNavigate();
  
  const searchVisibleClass = classnames({
    'form-inline': true,
    invisible: searchVisible,
  });

  const onSearch = (event) => {
    event.preventDefault();
    if (form.search) {
      dispatch(activeCategory(0));
      dispatch(searchTextStatus(form.search, true));
      setForm(DEFAULT_FORM_VALUE);
      navigate.push({
        pathname: `/catalog`,
        search: `?query=${form.search}&category=${categoriesState.activeCategory}`
      })
      setSearchVisible(false);
    } else setSearchVisible(!searchVisible);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="Bosa Noga" />
            </Link>
            <div className="collapase navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/catalog`}>Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacts">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    data-id="search-expander"
                    className="header-controls-pic header-controls-search"
                    onClick={onSearch}
                    onKeyPress={onSearch}
                    role="button"
                    tabIndex="0"
                    aria-label="Search field"
                  />
                  <Link to="/cart">
                    <div className="header-controls-pic header-controls-cart">
                      {(cartState.cartData.length > 0) && <div className="header-controls-cart-full">{cartState.cartData.length}</div>}
                      <div className="header-controls-cart-menu" />
                    </div>
                  </Link>
                </div>
                <form
                  data-id="search-form"
                  className={`header-controls-search-form ${searchVisibleClass}`}
                  onSubmit={onSearch}
                >
                  <input
                    className="form-control"
                    name="search"
                    placeholder="Поиск"
                    onChange={onInputChange}
                    value={form.search}
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}