import { useState } from "react";

interface ListGroupProps {
  cities: string[];
  header: string;
  handleItemSelected: (item: string) => void;
}

function ListGroup({ cities, header, handleItemSelected }: ListGroupProps) {
  const [itemSelected, setItemSelected] = useState(-1);

  return (
    <>
      <h1>{header}</h1>
      {cities.length == 0 && <p>No se encontraron ciudades</p>}
      <ul className="list-group">
        {cities.map((city, index) => (
          <li
            className={
              itemSelected === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={city}
            onClick={() => {
              setItemSelected(index);
              handleItemSelected(city);
            }}
          >
            {city}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
