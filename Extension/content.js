/*// SAFE GUARD: prevent double injection
if (!window.__DRAW_ACTIVE__) {
  window.__DRAW_ACTIVE__ = true;


  console.log("✅ Simple Screen Draw injected");

  setTimeout(() => {
    let enabled = false;
    let drawing = false;

    // Canvas
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "9999998";
    canvas.style.display = "none";
    canvas.style.pointerEvents = "auto";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Floating Button
    const btn = document.createElement("div");
    btn.innerText = "✏️";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.background = "#2563eb";
    btn.style.color = "#fff";
    btn.style.padding = "12px";
    btn.style.borderRadius = "50%";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "9999999";
    btn.title = "Toggle Draw";
    document.body.appendChild(btn);

    // Toggle
    btn.onclick = () => {
      enabled = !enabled;

      if (!enabled) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = "none";
      } else {
        canvas.style.display = "block";
      }
    };

    // Drawing
    canvas.addEventListener("mousedown", (e) => {
      if (!enabled) return;
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY);
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!drawing || !enabled) return;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    });

    canvas.addEventListener("mouseup", () => {
      drawing = false;
      ctx.closePath();
    });

  }, 500);
}  //Old Working Code
*/ 


//New Code Upgrade

if (!window.__SCREEN_DRAW_ACTIVE__) {
  window.__SCREEN_DRAW_ACTIVE__ = true;

  console.log("✅ Screen Draw Advanced Loaded");

  let enabled = false;
  let drawing = false;

  // ===== Create Canvas (SCROLLABLE) =====
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute"; // changed from fixed
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "9999998";
  canvas.style.display = "none";
  canvas.style.pointerEvents = "auto";

  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = document.documentElement.scrollWidth;
    canvas.height = document.documentElement.scrollHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // ===== DRAGGABLE FLOATING BUTTON =====
  const btn = document.createElement("div");
  btn.innerText = "✏️";
  btn.style.position = "fixed";
  btn.style.top = "80px";
  btn.style.left = "20px";
  btn.style.background = "#2563eb";
  btn.style.color = "#ffffff";
  btn.style.padding = "12px";
  btn.style.borderRadius = "50%";
  btn.style.cursor = "grab";
  btn.style.zIndex = "9999999";
  btn.title = "Drag me / Toggle Draw";

  document.body.appendChild(btn);

  // ===== DRAG LOGIC =====
  let isDragging = false;
  let offsetX, offsetY;

  btn.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - btn.offsetLeft;
    offsetY = e.clientY - btn.offsetTop;
    btn.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    btn.style.left = e.clientX - offsetX + "px";
    btn.style.top = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    btn.style.cursor = "grab";
  });

  // ===== TOGGLE LOGIC =====
  btn.addEventListener("dblclick", () => {
    enabled = !enabled;

    if (!enabled) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    } else {
      canvas.style.display = "block";
    }
  });

  // ===== DRAWING LOGIC (SCROLL SAFE) =====
  canvas.addEventListener("mousedown", (e) => {
    if (!enabled) return;
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.pageX, e.pageY);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!drawing || !enabled) return;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineTo(e.pageX, e.pageY);
    ctx.stroke();
  });

  canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.closePath();
  });
}
