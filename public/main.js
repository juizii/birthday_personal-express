const hbd = document.getElementsByClassName("hbd");
const trash = document.getElementsByClassName("fa-trash");
const clearAllBtn = document.getElementById("clear-all");


Array.from(hbd).forEach(function (element) {
  element.addEventListener("click", function () {
    const date = this.parentNode.parentNode.childNodes[1].innerText; //target it in ejs
    const name = this.parentNode.parentNode.childNodes[3].innerText; //target it in ejs
    const hbd = parseFloat(
      this.parentNode.parentNode.childNodes[5].innerText
    );
    fetch("messages", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        date: date,
        hbd: hbd,
      }),
    })
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      });
  });
});

Array.from(trash).forEach(function (element) {
  element.addEventListener("click", function () {
    const date = this.parentNode.parentNode.childNodes[1].innerText;
    const name = this.parentNode.parentNode.childNodes[3].innerText;
    fetch("messages", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        date: date,
      }),
    }).then(function (response) {
      window.location.reload();
    });
  });
});


clearAllBtn.addEventListener("click", function () {
  fetch("messages/all", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
});
