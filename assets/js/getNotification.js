getNotification = (pagename)=>{
    fetch("/api/notification.json").then((response) => {
            if (!response.ok) {
                throw new Error("Fetch Failed")
            }
            return response.json()
        }).then((data) => {
            data[pagename].forEach((element) => {
                console.log(element)
                // console.log(element["title"] == undefined? 0: element["title"])
                // Swal.fire({
                //     title: element["title"] == "popup" ? 0: element["title"],
                //     html: element["html"] == "popupmessage" ? 0: element["html"],
                //     icon: element["icon"] == "info" ? 0: element["icon"],
                // })
                Swal.fire(element)
            });
        }).catch((err) => {
            console.error(err)
            Swal.fire({
                title:"错误",
                icon: "error",
                text: "出现错误，请尝试刷新页面",
                theme: "dark"
            })
        })
}