
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { activeCategory } from '../../actions/categoriesAction';
import { useNavigate } from 'react-router';
var qs = require('qs');


export default function Categories(props) {
  const { onChange } = props;
  const categoriesState = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const history = useNavigate();
  const parsed = qs.parse(history.location.search.substr(1));
  const searchCategory = parsed.category !== undefined ? Number(parsed.category) : 0;
  const searchValue = parsed.query !== undefined ? parsed.query : '';
  
  const onCategoryChange = (event, id) => {
    event.preventDefault();
    dispatch(activeCategory(id));
    onChange(id);
   
    history.push({
      pathname: '/catalog',
      search: `?query=${searchValue}&category=${id}`
    })  
    
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categoriesState.categoriesData.map((value) => (
        <li className="nav-item" key={value.id}>
          <a
            className={cn({
              'nav-link': true,
              active: value.id === searchCategory,
            })}
            href=""
            onClick={(event) => onCategoryChange(event, value.id)}
          >
            {value.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

Categories.propTypes = {
  onChange: PropTypes.func.isRequired,
};
