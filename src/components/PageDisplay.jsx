import Pagination from "react-bootstrap/Pagination";

export const PageDisplay = ({
  pagesNum,
  setActivePage,
  activePage,
  setPage,
    scrollToCoordinates
}) => {
  let items = [];
  for (let number = 1; number <= pagesNum; number++) {
    items.push(number);
  }

  const handleClick = (item) => {
    setPage(item);
    setActivePage(item);
    window.scrollTo({ top: scrollToCoordinates, behavior: "instant"});
  }

  return (
    <>
      <Pagination bsPrefix={"customPagination"}>
        {items.map((item) => {
          return (
            <Pagination.Item
              key={item}
              active={item === activePage}
              onClick={() => handleClick(item)}
            >
              {item}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
};
