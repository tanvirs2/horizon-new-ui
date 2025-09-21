// vanilla JS
// init with element
/*var grid = document.querySelector('.info-section-grid');
var msnry = new Masonry( grid, {
    // options...
    itemSelector: '.info-box',
    columnWidth: 100,
    gutter: 1,
    percentPosition: true,

});*/

var elem = document.querySelector('.info-section-grid');
var pckry = new Packery( elem, {
    // options
    itemSelector: '.info-box',
    gutter: 10,
    percentPosition: true,
    columnWidth: 8
});

//pckry.bindDraggabillyEvents( draggie )


var itemElems = pckry.getItemElements();

itemElems.forEach(function(itemElem) {

    var draggie = new Draggabilly(itemElem, {
        handle: '.info-box-header'
    });
    pckry.bindDraggabillyEvents(draggie);

    /*var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);*/
});


document.querySelectorAll('.info-box-icons .fa-square').forEach(item=>{
    item.addEventListener('click', function(e) {

        let target = e.target;

        if (!target.dataset.origWidth) {
            target.dataset.origWidth = target.offsetWidth;
            target.dataset.origHeight = target.offsetHeight;
        }

        e.target.closest('.info-box').classList.toggle('grid-item--large');

        //console.log(e.target.closest('.info-box').classList.contains('grid-item--large'))


        if (!e.target.closest('.info-box').classList.contains('grid-item--large')) {
            restoreBox(e.target.closest('.info-box'));
        }

        //

        pckry.layout();
        setTimeout(function () {
            pckry.layout();
        }, 400)

    })
});

window.onload = function () {
    pckry.layout();
}


interact('.grid-item--large').resizable({
    edges: { left: true, right: true, bottom: true, top: true }
})
    .on('resizestart', function (event) {
        document.body.style.userSelect = 'none';
    })
    .on('resizemove', function (event) {
        let target = event.target;
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        pckry.layout();
    })
    .on('resizeend', function (event) {
        document.body.style.userSelect = '';
    });


// Restore function
function restoreBox(box) {
    //console.log(box.dataset)
    if (box.dataset.origWidth && box.dataset.origHeight) {
        box.style.width = box.dataset.origWidth + 'px';
        box.style.height = box.dataset.origHeight + 'px';
    } else {
        // fallback: auto
        box.style.width = '';
        box.style.height = '';
    }

    if (typeof pckry !== "undefined") {
        pckry.layout();
    }
}


const taskbar = document.getElementById("taskbar");

document.querySelectorAll(".fa-minus").forEach(btn => {
    btn.addEventListener("click", function () {
        const box = this.closest(".info-box");

        // Hide box
        box.style.display = "none";
        //taskbar.style.opacity = 0.9;

        // Add to taskbar
        let taskBtn = document.createElement("div");
        taskBtn.className = "taskbar-item";
        taskBtn.innerText = box.querySelector(".box-title").innerText.trim();

        // Save direct reference
        taskBtn._boxRef = box;

        // Restore when clicked
        taskBtn.addEventListener("click", function () {
            this._boxRef.style.display = "block";

            this.classList.add("remove-anim");

            this.addEventListener("animationend", () => {
                this.remove();
                if (!taskbar.innerHTML) {
                    taskbar.style.opacity = 0;
                }
                pckry.layout();

            }, { once: true });

        });

        taskbar.appendChild(taskBtn);

        //console.log(taskbar.innerHTML)
        if (taskbar.innerHTML) {
            taskbar.style.opacity = 1;
        }

        pckry.layout();
    });
});



document.querySelectorAll(".fa-times").forEach(btn => {
    btn.addEventListener("click", function () {
        const box = this.closest(".info-box");
        // Hide box
        //box.style.display = "none";

        box.remove();

        pckry.layout();
    });
});

