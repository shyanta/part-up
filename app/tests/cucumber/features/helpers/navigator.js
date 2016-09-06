export default  {
    gotoPage: (urlSlug) => {
        browser.url(`${process.env.ROOT_URL}/${urlSlug}`);
    }
}