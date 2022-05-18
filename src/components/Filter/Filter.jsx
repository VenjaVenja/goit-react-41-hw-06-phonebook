import { useDispatch, useSelector } from "react-redux";
import { filterContacts, getFilter } from "redux/itemsSlice";
import { FilterLabel, FilterText, FilterInput } from "./Filter.styled";

export const Filter = () => {
  const dispatch = useDispatch();
  const fiterItems = useSelector(getFilter);

  const heandleChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(filterContacts(value))
  }; 

  return (
    <FilterLabel>
      <FilterText>Find contacts by name</FilterText>
    <FilterInput
      type="text"
      name="filter"
      value={fiterItems}
      onChange={heandleChangeFilter} />
    </FilterLabel>
  )};