import Pagination from "@mui/material/Pagination";


export const PaginationComponent = ({totalLength, perPage, handlePageChange, currentPage, className}) => {
    return (
        <Pagination
            count={Math.ceil(totalLength / perPage)}
            page={currentPage}
            onChange={(_, v) => handlePageChange(_, v)}
            color="secondary"
            className={className}
            sx={{
                "& .MuiPaginationItem-root": {
                    backgroundColor: "purple",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "darkviolet",
                    },
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "darkviolet",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "purple",
                    },
                },
            }}
        />
    )
}