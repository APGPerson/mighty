async function loadFonts() {
    const font = new FontFace("Apple", 'url("/assets/font/PingFangSC-Regular.otf")');
    // wait for font to be loaded
    font.load().then(()=>{
    // add font to document
    document.fonts.add(font);
    // enable font with CSS class
    document.querySelectorAll(".cntext").forEach((ele) => { ele.classList.add("loaded") });
    }).catch(()=>{
        Swal.fire({
            title: "错误",
            icon: "error",
            text: "字体加载错误，将自动使用自带字体",
            theme: "dark",
            position: "top",
            timer: "4000",
            timerProgressBar: true,
            showConfirmButton: false
        })
    })
}