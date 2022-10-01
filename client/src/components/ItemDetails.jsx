import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const [details, setDetails] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/inventory/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [id]);

  return (
    <div>
      <h1>{details.item_name}</h1>
      <h2>{details.description}</h2>
      <h3>{details.quantity}</h3>
    </div>
  );
};

export default ItemDetails;

/*
/inventory/1

{
    item_name: "laptop",
    description: "wgweuiyhgrweg",
    user_id: 1
}


[
    {

    }
    ,
]
*/
