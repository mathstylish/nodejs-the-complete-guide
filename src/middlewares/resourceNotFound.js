const resourceNotFound = (req, res) => {
    res.status(404).render("404", {
        pageTitle: "Not Found",
        styles: [],
        path: "",
    })
}

export default resourceNotFound
