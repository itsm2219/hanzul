import React, { useState } from "react";



const MySearchBar = (props) => {



    const products = props.searchItems;
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event) => {      

        setSearchValue(event.target.value)

    }
    const shouldDisplayButton = searchValue.length > 0;
    const handleInputClear = () => {

        setSearchValue("")

    }

    const filteredProducts = products.filter((product) => {

        return product.includes(searchValue);

    })

    return(

        <div className="searchBar">
            <input type="text" value={searchValue} placeholder="search value" onChange={handleInputChange} />
            {shouldDisplayButton && <button onClick={handleInputClear}>clear</button>} 
            <ul>
                {filteredProducts.map((product) => {
                    return (<li key={product}>{product}</li>)
                })}
            </ul>
        </div>

    )

}

export default MySearchBar;

 
