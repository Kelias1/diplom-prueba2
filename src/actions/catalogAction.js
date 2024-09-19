import { createCatalog } from '../api/requests';
import history from '../history';

export const catalogFirstPageRequestStarted = () => ({ type: 'CATALOG_FIRSTPAGE_REQUEST' });
export const catalogNextPageRequestStarted = () => ({ type: 'CATALOG_NEXTPAGE_REQUEST' });
export const catalogFirstPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_FIRSTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogNextPageRequestSuccess = (catalogData) => ({ type: 'CATALOG_NEXTPAGE_REQUEST_SUCCESS', payload: { catalogData } });
export const catalogRequestFailure = (errorText) => ({ type: 'CATALOG_REQUEST_FAILURE', payload: { errorText } });


export const catalogRequest = (searchText, categoryId, offset) => async (dispatch) => {
  if (offset) dispatch(catalogNextPageRequestStarted());
  else dispatch(catalogFirstPageRequestStarted());

  try {
    const catalogData = await createCatalog(searchText, categoryId, offset);

    if (offset) dispatch(catalogNextPageRequestSuccess(catalogData))
    else dispatch(catalogFirstPageRequestSuccess(catalogData));
  } catch (error) {
  const detailedError = JSON.parse(error.message);
  dispatch(catalogRequestFailure(detailedError.text));
  }
};