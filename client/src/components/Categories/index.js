import React, { useState, useEffect } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
import useScreenSize from "../../hooks/screenSize/useScreenSize";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import Arrow from "react-arrows";
import EventsMobile from "../Events";
function Categories() {  

  const [items] = useState( [
    {
        category: 'Sports',
    },
    {
        category: 'Party',
    },
    {
        category: 'Crafts',
    }
  ]);

  const { isDesktop } = useScreenSize();
  const [selected, setSelected] = useState([]);
  const {loading, data } = useQuery(QUERY_CATEGORIES);
  const isItemSelected = (id) => !!selected.find((el) => el === id);
const [category, setCategory]=useState("")
const [defaultId, setDefaultId]=useState("")
  const categories = data?.categories || [];
  console.log(categories);
//  useEffect(()=>{
  
window.onload= function(){
    //setDefaultId(categories[0]._id ?categories[0]._id : "")
    if(loading===false && document.getElementById("0")){
  
      document.getElementById("0").click()
    }
}

    
//  },[])

  const handleClick =
    (id) =>{
    console.log(id)
    setCategory(id)
      // ({ getItemById, scrollToItem }) => {
      

    //   const itemSelected = isItemSelected(id);

    //   setSelected((currentSelected) =>
    //     itemSelected
    //       ? currentSelected.filter((el) => el !== id)
    //       : currentSelected.concat(id)
    //   );
    // };
  }

  console.log(selected);
  return (
    !isDesktop && (
      <>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {categories.map((category, index ) => (
          <div className="bully">
            <CategoryCard
              id={index}
              itemId={category._id}
              category={category.name}
              onClick={()=>handleClick(category._id)}
              setSelected={isItemSelected(category._id)}
            />
          </div>
        ))}
      </ScrollMenu>
      <EventsMobile defaultId={defaultId} category={category}></EventsMobile>
      </>
    )
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      Left
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      Right
    </Arrow>
  );
}

function CategoryCard({
  onClick,
  selected,
  category,
  itemId,
  id,
  key
}) {

  
  const visibility = React.useContext(VisibilityContext);
  return (
    
    <div
      className="category-section"
     
      onClick={() => onClick(visibility)}
      style={{
        width: "220px",
      }}
      tabIndex={0}
    >
      <div className="category-card">
        <div  id={id}  className="category-title"> <h2>{category}</h2>         
        </div>
        {/* <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div> */}
      </div>
      <div
        style={{
          height: "20px",
        }}
      />
    </div>
  );
}

export default Categories;
