/* ========================================
   PRIMECUTS - INTERACTIVE FEATURES
   All 20 Crazy Ideas Implemented
   ======================================== */

// ==========================================
// 1. LIVE SLAUGHTER COUNTDOWN TIMER
// ==========================================
function initCountdown() {
  const targetTime = new Date().getTime() + 45 * 60 * 1000; // 45 minutes from now

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance < 0) {
      // Reset countdown
      location.reload();
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("hours").textContent = String(hours).padStart(
      2,
      "0",
    );
    document.getElementById("minutes").textContent = String(minutes).padStart(
      2,
      "0",
    );
    document.getElementById("seconds").textContent = String(seconds).padStart(
      2,
      "0",
    );
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==========================================
// 2. CHOOSE YOUR ANIMAL INTERACTIVE
// ==========================================
function initAnimalSelector() {
  const animalCards = document.querySelectorAll(".animal-card");
  const detailsSection = document.getElementById("animalDetails");

  const yieldData = {
    cow: { prime: "80kg", regular: "70kg", ground: "30kg", bones: "20kg" },
    goat: { prime: "6kg", regular: "5kg", ground: "2kg", bones: "2kg" },
    sheep: { prime: "7kg", regular: "6kg", ground: "3kg", bones: "2kg" },
    pig: { prime: "28kg", regular: "24kg", ground: "12kg", bones: "6kg" },
  };

  animalCards.forEach((card) => {
    card.querySelector(".select-animal-btn").addEventListener("click", () => {
      const animal = card.dataset.animal;
      const animalName = card.querySelector("h3").textContent;

      // Update active state
      animalCards.forEach((c) => (c.style.borderColor = "transparent"));
      card.style.borderColor = "var(--primary)";

      // Show details
      detailsSection.style.display = "block";
      document.getElementById("selectedAnimalName").textContent =
        animalName + " Breakdown";
      document.getElementById("primeCuts").textContent =
        yieldData[animal].prime;
      document.getElementById("regularCuts").textContent =
        yieldData[animal].regular;
      document.getElementById("groundMeat").textContent =
        yieldData[animal].ground;
      document.getElementById("bonesOrgans").textContent =
        yieldData[animal].bones;

      // Smooth scroll
      detailsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

// ==========================================
// 3. CUT SELECTION DIAGRAM
// ==========================================
function initCutSelection() {
  const cutParts = document.querySelectorAll(".cut-part");
  const cutsList = document.getElementById("selectedCutsList");
  const cutsTotal = document.getElementById("cutsTotal");
  let selectedCuts = [];

  cutParts.forEach((part) => {
    part.addEventListener("click", () => {
      const cutName = part.dataset.cut;
      const cutPrice = parseFloat(part.dataset.price);

      // Toggle selection
      if (part.classList.contains("selected")) {
        part.classList.remove("selected");
        selectedCuts = selectedCuts.filter((c) => c.name !== cutName);
      } else {
        part.classList.add("selected");
        selectedCuts.push({ name: cutName, price: cutPrice });
      }

      updateCutsList();
    });
  });

  function updateCutsList() {
    if (selectedCuts.length === 0) {
      cutsList.innerHTML =
        '<p class="empty-state">Click cuts above to add them</p>';
      cutsTotal.textContent = "$0";
    } else {
      cutsList.innerHTML = selectedCuts
        .map(
          (cut) => `
        <div class="cut-list-item">
          <span class="cut-name">${cut.name}</span>
          <span class="cut-price">$${cut.price}/kg</span>
          <button class="remove-cut" data-cut="${cut.name}">×</button>
        </div>
      `,
        )
        .join("");

      const total = selectedCuts.reduce((sum, cut) => sum + cut.price, 0);
      cutsTotal.textContent = `$${total}`;

      // Add remove listeners
      document.querySelectorAll(".remove-cut").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const cutName = btn.dataset.cut;
          const cutPart = Array.from(cutParts).find(
            (p) => p.dataset.cut === cutName,
          );
          cutPart.click();
        });
      });
    }
  }
}

// ==========================================
// 4. BUILD YOUR OWN MEAT BOX
// ==========================================
function initMeatBoxBuilder() {
  const meatOptions = document.querySelectorAll(".meat-option");
  const boxItems = document.getElementById("boxItems");
  const boxWeight = document.getElementById("boxWeight");
  const boxPrice = document.getElementById("boxPrice");

  meatOptions.forEach((option) => {
    const minusBtn = option.querySelector(".qty-btn.minus");
    const plusBtn = option.querySelector(".qty-btn.plus");
    const input = option.querySelector(".qty-input");

    minusBtn.addEventListener("click", () => {
      if (input.value > 0) {
        input.value = parseInt(input.value) - 1;
        updateBox();
      }
    });

    plusBtn.addEventListener("click", () => {
      if (input.value < input.max) {
        input.value = parseInt(input.value) + 1;
        updateBox();
      }
    });

    input.addEventListener("change", updateBox);
  });

  function updateBox() {
    const items = [];
    let totalWeight = 0;
    let totalPrice = 0;

    meatOptions.forEach((option) => {
      const input = option.querySelector(".qty-input");
      const qty = parseInt(input.value);
      if (qty > 0) {
        const name = option.querySelector("h4").textContent;
        const price = parseFloat(input.dataset.price);
        items.push({ name, qty, price });
        totalWeight += qty;
        totalPrice += qty * price;
      }
    });

    if (items.length === 0) {
      boxItems.innerHTML = '<p class="empty-state">Add items to your box</p>';
    } else {
      boxItems.innerHTML = items
        .map(
          (item) => `
        <div class="box-item">
          <span>${item.qty}kg ${item.name}</span>
          <span>$${(item.qty * item.price).toFixed(2)}</span>
        </div>
      `,
        )
        .join("");
    }

    boxWeight.textContent = `${totalWeight} kg`;
    boxPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Weight Calculator
  document.getElementById("calculateWeight")?.addEventListener("click", () => {
    const people = parseInt(document.getElementById("peopleCount").value);
    const recommendedKg = people * 0.5; // 500g per person
    document.getElementById("recommendation").textContent =
      `Recommended: Order ${recommendedKg}kg of meat for ${people} people`;
  });
}

// ==========================================
// 5. LIVE ORDERS FEED
// ==========================================
function initLiveOrdersFeed() {
  const container = document.getElementById("liveOrdersContainer");

  const names = [
    "John",
    "Mary",
    "Peter",
    "Grace",
    "David",
    "Sarah",
    "Michael",
    "Jane",
  ];
  const locations = ["Nairobi", "Kiambu", "Machakos", "Nakuru", "Thika"];
  const meats = ["Beef", "Goat", "Mutton", "Pork"];

  function generateOrder() {
    const name = names[Math.floor(Math.random() * names.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const meat = meats[Math.floor(Math.random() * meats.length)];
    const kg = Math.floor(Math.random() * 5) + 1;

    return `<div class="order-item">${name} from ${location} ordered ${kg}kg ${meat}</div>`;
  }

  // Generate initial orders (doubled for seamless scroll)
  let ordersHTML = "";
  for (let i = 0; i < 10; i++) {
    ordersHTML += generateOrder();
  }
  container.innerHTML = ordersHTML + ordersHTML; // Duplicate for seamless loop

  // Add new order every 5 seconds
  setInterval(() => {
    const newOrder = generateOrder();
    container.innerHTML += newOrder;
  }, 5000);
}

// ==========================================
// 6. DELIVERY BIKE TRACKER
// ==========================================
function initDeliveryTracker() {
  let distance = 5.2;
  let speed = 42;

  function updateTracker() {
    distance = Math.max(0, distance - 0.1);
    speed = 35 + Math.floor(Math.random() * 15);

    const minutes = Math.round((distance / speed) * 60);

    if (document.getElementById("distanceRemaining")) {
      document.getElementById("distanceRemaining").textContent =
        `${distance.toFixed(1)} km`;
      document.getElementById("estArrival").textContent = `${minutes} mins`;
      document.getElementById("currentSpeed").textContent = `${speed} km/h`;
    }

    if (distance <= 0) {
      clearInterval(trackerInterval);
    }
  }

  const trackerInterval = setInterval(updateTracker, 3000);
}

// ==========================================
// 7. MEAT PRICE GRAPH (Simple Canvas Chart)
// ==========================================
function initPriceGraph() {
  const canvas = document.getElementById("priceChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Data: 7 days of prices
  const beefPrices = [11, 11.2, 11.5, 11.8, 12, 12.3, 12.5];
  const goatPrices = [11.8, 12, 11.9, 12, 12.1, 12, 12];
  const muttonPrices = [12.5, 12.4, 12.3, 12.2, 12.1, 12, 11.7];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Draw grid
  ctx.strokeStyle = "#e0e0e0";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const y = (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw lines
  function drawLine(data, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((price, i) => {
      const x = (width / (data.length - 1)) * i;
      const y = height - ((price - 10) / 5) * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }

  drawLine(beefPrices, "#d32f2f");
  drawLine(goatPrices, "#ff9800");
  drawLine(muttonPrices, "#27ae60");

  // Draw labels
  ctx.fillStyle = "#666";
  ctx.font = "12px Arial";
  days.forEach((day, i) => {
    const x = (width / (days.length - 1)) * i;
    ctx.fillText(day, x - 10, height - 5);
  });
}

// ==========================================
// 8. BOOKING CALENDAR
// ==========================================
function initBookingCalendar() {
  let currentMonth = 3; // April (0-indexed)
  let currentYear = 2026;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function renderCalendar() {
    const grid = document.getElementById("calendarGrid");
    if (!grid) return;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    document.getElementById("currentMonth").textContent =
      `${monthNames[currentMonth]} ${currentYear}`;

    let html = "";

    // Add day labels
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    dayLabels.forEach((day) => {
      html += `<div style="text-align: center; font-weight: 700; padding: 0.5rem;">${day}</div>`;
    });

    // Add empty cells for first week
    for (let i = 0; i < firstDay; i++) {
      html += "<div></div>";
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const random = Math.random();
      let className = "calendar-day ";
      if (random > 0.7) className += "available";
      else if (random > 0.4) className += "limited";
      else className += "booked";

      html += `<div class="${className}" data-day="${day}">${day}</div>`;
    }

    grid.innerHTML = html;

    // Add click handlers
    grid.querySelectorAll(".calendar-day:not(.booked)").forEach((day) => {
      day.addEventListener("click", function () {
        grid
          .querySelectorAll(".calendar-day")
          .forEach((d) => d.classList.remove("selected"));
        this.classList.add("selected");

        const selectedDay = this.dataset.day;
        const summary = document.getElementById("bookingSummary");
        summary.style.display = "block";
        document.getElementById("selectedDate").textContent =
          `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`;
        document.getElementById("availableSlots").textContent =
          this.classList.contains("limited") ? "2 slots" : "5 slots";
      });
    });
  }

  document.getElementById("prevMonth")?.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById("nextMonth")?.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  renderCalendar();
}

// ==========================================
// 9. FRESHNESS METER (Auto-progress)
// ==========================================
function initFreshnessMeter() {
  let progress = 0;
  const steps = ["slaughtered", "packed", "transit", "delivered"];
  const statuses = [
    "Just Slaughtered",
    "Being Packed",
    "In Transit",
    "Delivered",
  ];

  function updateFreshness() {
    if (progress < 100) {
      progress += 2;

      const currentStepIndex = Math.floor(progress / 25);
      const currentStep = steps[Math.min(currentStepIndex, 3)];

      // Update timeline
      steps.forEach((step, i) => {
        const element = document.getElementById(`step-${step}`);
        if (element) {
          if (i <= currentStepIndex) {
            element.classList.add("active");
          }
        }
      });

      // Update connectors
      document.querySelectorAll(".timeline-connector").forEach((conn, i) => {
        if (i < currentStepIndex) {
          conn.classList.add("active");
        }
      });

      // Update status text
      const statusEl = document.getElementById("currentStatus");
      if (statusEl) {
        statusEl.textContent = statuses[Math.min(currentStepIndex, 3)];
      }

      // Update progress bar
      const fillEl = document.getElementById("freshnessFill");
      if (fillEl) {
        fillEl.style.width = `${progress}%`;
      }
    }
  }

  setInterval(updateFreshness, 2000);
}

// ==========================================
// 10. INSTANT PRICE NEGOTIATION
// ==========================================
function initPriceNegotiation() {
  const negotiateBtns = document.querySelectorAll(".negotiate-btn");
  const resultDiv = document.getElementById("negotiationResult");
  const finalPriceDiv = document.getElementById("finalPrice");
  const basePrice = 60;

  negotiateBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const discount = parseInt(btn.dataset.discount);
      const random = Math.random();

      // Approval logic: higher discounts less likely
      const approved =
        (discount === 5 && random > 0.2) ||
        (discount === 10 && random > 0.5) ||
        (discount === 15 && random > 0.8);

      if (approved) {
        const finalPrice = basePrice * (1 - discount / 100);
        resultDiv.className = "negotiation-result success";
        resultDiv.textContent = `✓ ${discount}% discount approved!`;
        finalPriceDiv.textContent = `Final Price: $${finalPrice.toFixed(2)}`;
      } else {
        resultDiv.className = "negotiation-result rejected";
        resultDiv.textContent = `✗ ${discount}% discount not available. Try a lower discount.`;
        finalPriceDiv.textContent = "";
      }
    });
  });
}

// ==========================================
// 11. URGENCY BADGE (Auto-update stock)
// ==========================================
function initUrgencyBadge() {
  let stock = 3;

  setInterval(() => {
    if (stock > 0 && Math.random() > 0.7) {
      stock--;
      const stockEl = document.getElementById("stockCount");
      if (stockEl) {
        stockEl.textContent = stock;

        if (stock === 0) {
          document.getElementById("urgencyBadge").textContent =
            "⚠️ Sold out! Next batch in 2 hours";
        }
      }
    }
  }, 10000);
}

// ==========================================
// 12. FARM DISTANCE (Simulated GPS)
// ==========================================
function initFarmDistance() {
  const distances = [18, 23, 27, 31, 15, 42];
  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % distances.length;
    const distanceEl = document.getElementById("farmDistance");
    if (distanceEl) {
      distanceEl.textContent = `${distances[currentIndex]} km away`;
    }
  }, 15000);
}

// ==========================================
// 13. HALAL TOGGLE
// ==========================================
function initHalalToggle() {
  const toggle = document.getElementById("halalToggle");
  let isHalalOnly = false;

  toggle?.addEventListener("click", () => {
    isHalalOnly = !isHalalOnly;
    toggle.classList.toggle("active");

    // Show/hide non-halal products
    document.querySelectorAll(".product-card").forEach((card) => {
      const isHalal = card.querySelector(".halal-badge");
      if (!isHalal && isHalalOnly) {
        card.style.opacity = "0.3";
        card.style.pointerEvents = "none";
      } else {
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      }
    });
  });
}

// ==========================================
// 14. WATCH LIVE STREAM MODAL
// ==========================================
function initLiveStreamModal() {
  const modal = document.getElementById("liveStreamModal");
  const btn = document.getElementById("watchLiveBtn");
  const close = modal?.querySelector(".close");

  btn?.addEventListener("click", () => {
    modal.classList.add("active");
  });

  close?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// ==========================================
// 15. PARTICLE EFFECT (Hero Background)
// ==========================================
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.fillStyle = `rgba(255, 77, 77, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==========================================
// 16. FAQ ACCORDION
// ==========================================
function initFAQ() {
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains("active");

      // Close all
      document
        .querySelectorAll(".faq-item")
        .forEach((i) => i.classList.remove("active"));

      // Open clicked if it wasn't active
      if (!wasActive) {
        item.classList.add("active");
      }

      // Update icon
      btn.querySelector("span").textContent = item.classList.contains("active")
        ? "−"
        : "+";
    });
  });
}

// ==========================================
// 17. NEWSLETTER SUBSCRIPTION
// ==========================================
function initNewsletter() {
  const subscribeBtn = document.getElementById("subscribeBtn");
  const emailInput = document.getElementById("newsEmail");
  const msgDiv = document.getElementById("newsMsg");

  subscribeBtn?.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
      msgDiv.innerHTML =
        '<span style="color:#ffcccc;">Please enter a valid email</span>';
      return;
    }

    msgDiv.innerHTML =
      '<span style="color:#27ae60;">🎉 Subscribed! Check your inbox for 10% off.</span>';
    emailInput.value = "";
  });
}

// ==========================================
// 18. SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollReveal() {
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const revealPoint = 100;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", reveal);
  reveal(); // Initial check
}

// ==========================================
// 19. ANIMATED COUNTERS (Stats Section)
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateCounters() {
    if (animated) return;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent =
            target + (target === 98 ? "%" : target === 2 ? "hr" : "+");
          clearInterval(timer);
        } else {
          counter.textContent =
            Math.floor(current) +
            (target === 98 ? "%" : target === 2 ? "hr" : "+");
        }
      }, 16);
    });

    animated = true;
  }

  // Trigger when stats section is in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  });

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// ==========================================
// 20. FLOATING ORDER BUTTON
// ==========================================
function initFloatingButton() {
  const btn = document.getElementById("floatingOrder");

  btn?.addEventListener("click", () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  });

  // Hide on scroll to bottom
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      btn.style.opacity = "0";
    } else {
      btn.style.opacity = "1";
    }
  });
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🥩 PrimeCuts Interactive Features Loading...");

  // Initialize all features
  initCountdown();
  initAnimalSelector();
  initCutSelection();
  initMeatBoxBuilder();
  initLiveOrdersFeed();
  initDeliveryTracker();
  initPriceGraph();
  initBookingCalendar();
  initFreshnessMeter();
  initPriceNegotiation();
  initUrgencyBadge();
  initFarmDistance();
  initHalalToggle();
  initLiveStreamModal();
  initParticles();
  initFAQ();
  initNewsletter();
  initScrollReveal();
  initCounters();
  initFloatingButton();

  console.log("✅ All features loaded successfully!");
});

// ==========================================
// ADDITIONAL ENHANCEMENTS
// ==========================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// Performance monitoring
console.log(`
╔════════════════════════════════════════╗
║   PRIMECUTS - FULLY LOADED             ║
║   20 Interactive Features Active       ║
║   Fresh Meat, Fresh Tech! 🥩           ║
╚════════════════════════════════════════╝
`);
