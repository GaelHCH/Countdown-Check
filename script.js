    let count = 0;
    const display = document.getElementById("count");

    //localStorage set up
    function render() {
        display.textContent = count;
    }

    function save() {
        localStorage.setItem("count", count);
    }

    //On page load, restore saved progress if there's any
    const saved = localStorage.getItem("count");
    if (saved != null) {
        count = Number(saved);
    }
    render();

    document.getElementById("set").addEventListener("click", () => {
      count = Number(document.getElementById("start").value);
      save();
      render();
    });

    document.getElementById("check").addEventListener("click", () => {
      if (count > 0) {
        count -= 1;
        save();
        render();
      }
    });