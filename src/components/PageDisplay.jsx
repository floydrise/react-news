import Pagination from "react-bootstrap/Pagination";

export const PageDisplay = ({
  pagesNum,
  setActivePage,
  activePage,
  setPage,
}) => {
  let items = [];
  for (let number = 1; number <= pagesNum; number++) {
    items.push(number);
  }

  return (
    <>
      <Pagination bsPrefix={"customPagination"}>
        {items.map((item) => {
          return (
            <Pagination.Item
              key={item}
              active={item === activePage}
              onClick={() => {
                setPage(item);
                setActivePage(item);
                window.scrollTo({ top: 0 });
              }}
            >
              {item}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </>
  );
};
