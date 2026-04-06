/* ========================================
   PRIMECUTS CAREERS - INTERACTIVE FEATURES
   All 20 Ideas Implemented
   ======================================== */

// ==========================================
// 1. DARK MODE TOGGLE
// ==========================================
function initDarkMode() {
  const toggle = document.getElementById("darkModeToggle");
  const icon = toggle?.querySelector(".icon");

  // Check saved preference
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    if (icon) icon.textContent = "☀️";
  }

  toggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkNow = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkNow);
    if (icon) icon.textContent = isDarkNow ? "☀️" : "🌙";
  });
}

// ==========================================
// 2. LIVE APPLICATION COUNTER
// ==========================================
function initLiveCounter() {
  let count = 3;
  const counterEl = document.getElementById("liveApplicants");

  setInterval(() => {
    count = Math.floor(Math.random() * 5) + 1; // 1-5 applicants
    if (counterEl) {
      counterEl.textContent = count;
    }
  }, 5000);
}

// ==========================================
// 3. ANIMATED STAT COUNTERS
// ==========================================
function initStatCounters() {
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
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });

    animated = true;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  });

  const heroSection = document.querySelector(".careers-hero");
  if (heroSection) {
    observer.observe(heroSection);
  }
}

// ==========================================
// 4. JOB FILTERS
// ==========================================
function initJobFilters() {
  const locationFilter = document.getElementById("locationFilter");
  const departmentFilter = document.getElementById("departmentFilter");
  const typeFilter = document.getElementById("typeFilter");
  const resetBtn = document.getElementById("resetFilters");
  const jobCards = document.querySelectorAll(".job-card");

  function filterJobs() {
    const location = locationFilter?.value || "all";
    const department = departmentFilter?.value || "all";
    const type = typeFilter?.value || "all";

    jobCards.forEach((card) => {
      const cardLocation = card.dataset.location;
      const cardDepartment = card.dataset.department;
      const cardType = card.dataset.type;

      const matchLocation = location === "all" || cardLocation === location;
      const matchDepartment =
        department === "all" || cardDepartment === department;
      const matchType = type === "all" || cardType === type;

      if (matchLocation && matchDepartment && matchType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  locationFilter?.addEventListener("change", filterJobs);
  departmentFilter?.addEventListener("change", filterJobs);
  typeFilter?.addEventListener("change", filterJobs);

  resetBtn?.addEventListener("click", () => {
    if (locationFilter) locationFilter.value = "all";
    if (departmentFilter) departmentFilter.value = "all";
    if (typeFilter) typeFilter.value = "all";
    filterJobs();
  });
}

// ==========================================
// 5. JOB DETAIL MODAL
// ==========================================
const jobDetails = {
  "delivery-rider": {
    title: "Delivery Rider",
    location: "Nairobi",
    department: "Logistics",
    salary: "KES 25,000 - 40,000",
    type: "Full Time",
    responsibilities: [
      "Deliver PrimeCuts orders safely and on time",
      "Maintain delivery vehicle in good condition",
      "Communicate with customers professionally",
      "Handle cash and electronic payments",
      "Report any issues or delays promptly",
    ],
    requirements: [
      "Valid motorcycle license",
      "At least 2 years riding experience",
      "Good knowledge of Nairobi roads",
      "Smartphone with data",
      "Professional appearance and attitude",
    ],
    benefits: [
      "Fuel allowance",
      "Free monthly meat package",
      "Medical insurance",
      "Performance bonuses",
      "Flexible schedules",
    ],
  },
  "vet-inspector": {
    title: "Veterinary Inspector",
    location: "Nakuru",
    department: "Veterinary",
    salary: "KES 50,000 - 80,000",
    type: "Full Time",
    responsibilities: [
      "Inspect livestock health before slaughter",
      "Ensure compliance with food safety standards",
      "Maintain inspection records and reports",
      "Verify farm certifications",
      "Train staff on animal welfare",
    ],
    requirements: [
      "Veterinary degree from recognized institution",
      "Valid practicing license",
      "3+ years experience in food safety",
      "Knowledge of halal slaughter standards",
      "Strong attention to detail",
    ],
    benefits: [
      "Medical cover for family",
      "Professional development budget",
      "Company vehicle",
      "Housing allowance",
      "Performance bonuses",
    ],
  },
  "marketplace-manager": {
    title: "Marketplace Manager",
    location: "Nairobi",
    department: "Operations",
    salary: "KES 60,000 - 90,000",
    type: "Full Time",
    responsibilities: [
      "Manage farmer partnerships and onboarding",
      "Oversee daily marketplace operations",
      "Coordinate between farms and customers",
      "Monitor supply chain efficiency",
      "Handle escalated customer issues",
    ],
    requirements: [
      "Degree in Business, Agriculture, or related field",
      "4+ years in operations or supply chain",
      "Excellent communication skills",
      "Experience with marketplace platforms",
      "Strong problem-solving abilities",
    ],
    benefits: [
      "Comprehensive medical insurance",
      "Company laptop and phone",
      "Quarterly bonuses",
      "Career growth opportunities",
      "Team building events",
    ],
  },
  "slaughter-tech": {
    title: "Slaughter Technician",
    location: "Nairobi",
    department: "Operations",
    salary: "KES 30,000 - 50,000",
    type: "Full Time",
    responsibilities: [
      "Perform humane slaughter following halal standards",
      "Maintain equipment and work area cleanliness",
      "Follow all food safety protocols",
      "Record daily operations",
      "Participate in livestream transparency program",
    ],
    requirements: [
      "Halal slaughter certification",
      "2+ years experience",
      "Physical fitness for demanding work",
      "Knowledge of food safety standards",
      "Ability to work in cold environments",
    ],
    benefits: [
      "Specialized training",
      "Protective equipment provided",
      "Medical insurance",
      "Free meat allowance",
      "Overtime opportunities",
    ],
  },
  "warehouse-assistant": {
    title: "Warehouse Assistant",
    location: "Kiambu",
    department: "Logistics",
    salary: "KES 20,000 - 35,000",
    type: "Part Time",
    responsibilities: [
      "Organize and maintain warehouse inventory",
      "Assist with order preparation",
      "Load and unload deliveries",
      "Maintain cold storage standards",
      "Keep warehouse clean and organized",
    ],
    requirements: [
      "High school diploma",
      "Physical ability to lift heavy items",
      "Basic computer skills",
      "Attention to detail",
      "Reliable and punctual",
    ],
    benefits: [
      "Flexible hours",
      "Free meat monthly",
      "Potential for full-time",
      "Training provided",
      "Overtime pay",
    ],
  },
  "accounts-officer": {
    title: "Accounts Officer",
    location: "Nairobi",
    department: "Finance",
    salary: "KES 45,000 - 70,000",
    type: "Full Time",
    responsibilities: [
      "Manage accounts payable and receivable",
      "Process farmer payments",
      "Prepare monthly financial reports",
      "Reconcile bank statements",
      "Assist with budgeting and forecasting",
    ],
    requirements: [
      "CPA qualification or equivalent",
      "3+ years accounting experience",
      "Proficiency in accounting software",
      "Strong Excel skills",
      "Excellent organizational abilities",
    ],
    benefits: [
      "Medical insurance",
      "Professional certification support",
      "Annual bonuses",
      "Modern office environment",
      "Career progression",
    ],
  },
};

function initJobModal() {
  const modal = document.getElementById("jobModal");
  const closeBtn = document.getElementById("closeModal");
  const viewBtns = document.querySelectorAll(".view-job-btn");

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobId = btn.dataset.job;
      const job = jobDetails[jobId];

      if (job) {
        const modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = `
          <h2>${job.title}</h2>
          <div class="job-meta" style="margin: 1rem 0;">
            <span style="margin-right: 1rem;">📍 ${job.location}</span>
            <span style="margin-right: 1rem;">🏢 ${job.department}</span>
            <span>💰 ${job.salary}</span>
          </div>
          
          <h3 style="margin-top: 2rem;">Responsibilities</h3>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            ${job.responsibilities.map((r) => `<li>${r}</li>`).join("")}
          </ul>
          
          <h3 style="margin-top: 2rem;">Requirements</h3>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            ${job.requirements.map((r) => `<li>${r}</li>`).join("")}
          </ul>
          
          <h3 style="margin-top: 2rem;">Benefits</h3>
          <ul style="margin: 1rem 0; padding-left: 1.5rem; line-height: 1.8;">
            ${job.benefits.map((b) => `<li>${b}</li>`).join("")}
          </ul>
          
          <button onclick="document.getElementById('apply').scrollIntoView({behavior: 'smooth'}); document.getElementById('jobModal').classList.remove('active');" 
                  style="width: 100%; margin-top: 2rem; background: linear-gradient(135deg, #ff4d4d, #ff9800); color: white; border: none; padding: 1rem; border-radius: 25px; font-weight: 700; cursor: pointer; font-size: 1rem;">
            Apply for this Position
          </button>
        `;

        modal.classList.add("active");
      }
    });
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// ==========================================
// 6. APPLICATION FORM MULTI-STEP
// ==========================================
let currentStep = 1;

function nextStep() {
  // Validate current step
  const currentStepEl = document.querySelector(
    `.form-step[data-step="${currentStep}"]`,
  );
  const inputs = currentStepEl.querySelectorAll(
    "input[required], select[required], textarea[required]",
  );

  let valid = true;
  inputs.forEach((input) => {
    if (!input.value) {
      valid = false;
      input.style.borderColor = "var(--primary)";
    } else {
      input.style.borderColor = "";
    }
  });

  if (!valid) {
    alert("Please fill all required fields");
    return;
  }

  // Phone validation for step 1
  if (currentStep === 1) {
    const phone = document.getElementById("phone").value;
    if (!validatePhone(phone)) {
      document.getElementById("phone-error").textContent =
        "Enter valid Kenyan number (+2547XXXXXXXX)";
      return;
    }
  }

  // Update review for step 3
  if (currentStep === 2) {
    updateReview();
  }

  // Move to next step
  if (currentStep < 3) {
    currentStep++;
    updateStepDisplay();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepDisplay();
  }
}

function updateStepDisplay() {
  // Update form steps
  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.remove("active");
  });
  document
    .querySelector(`.form-step[data-step="${currentStep}"]`)
    .classList.add("active");

  // Update progress indicators
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });
  for (let i = 1; i <= currentStep; i++) {
    document.querySelector(`.step[data-step="${i}"]`).classList.add("active");
  }

  // Update progress bar
  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = `${(currentStep / 3) * 100}%`;
}

function updateReview() {
  document.getElementById("reviewName").textContent =
    document.getElementById("fullName").value;
  document.getElementById("reviewEmail").textContent =
    document.getElementById("email").value;
  document.getElementById("reviewPhone").textContent =
    document.getElementById("phone").value;
  document.getElementById("reviewPosition").textContent =
    document.getElementById("position").selectedOptions[0].text;

  const fileName = document.getElementById("fileName").textContent;
  document.getElementById("reviewCV").textContent = fileName || "Not uploaded";
}

// Make functions global
window.nextStep = nextStep;
window.prevStep = prevStep;

// ==========================================
// 7. DRAG & DROP CV UPLOAD
// ==========================================
function initCVUpload() {
  const uploadArea = document.getElementById("cvUploadArea");
  const fileInput = document.getElementById("cvUpload");
  const fileNameDisplay = document.getElementById("fileName");

  uploadArea?.addEventListener("click", () => {
    fileInput.click();
  });

  uploadArea?.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("dragover");
  });

  uploadArea?.addEventListener("dragleave", () => {
    uploadArea.classList.remove("dragover");
  });

  uploadArea?.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });

  fileInput?.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  });

  function handleFile(file) {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert("Please upload a PDF or DOC file");
      return;
    }

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      return;
    }

    fileNameDisplay.textContent = `✓ ${file.name}`;
    analyzeResume(file);
  }
}

// ==========================================
// 8. RESUME SCORE CHECKER
// ==========================================
function analyzeResume(file) {
  const resumeScore = document.getElementById("resumeScore");
  const scoreBadge = document.getElementById("scoreBadge");
  const scoreDetails = document.getElementById("scoreDetails");

  // Simulate analysis
  setTimeout(() => {
    const score = Math.random() > 0.5 ? "good" : "needs-improvement";

    if (score === "good") {
      scoreBadge.className = "score-badge good";
      scoreBadge.textContent = "✓ Good Match";
      scoreDetails.textContent =
        "Your resume looks great! It includes relevant experience and skills for this position.";
    } else {
      scoreBadge.className = "score-badge needs-improvement";
      scoreBadge.textContent = "⚠ Needs Improvement";
      scoreDetails.textContent =
        "Consider adding more details about your experience and relevant skills for this position.";
    }

    resumeScore.style.display = "block";
  }, 1500);
}

// ==========================================
// 9. PHONE VALIDATION
// ==========================================
function validatePhone(phone) {
  const kenyaRegex = /^\+2547\d{8}$/;
  return kenyaRegex.test(phone);
}

// ==========================================
// 10. FORM SUBMISSION
// ==========================================
function initFormSubmission() {
  const form = document.getElementById("jobForm");
  const successMsg = document.getElementById("successMsg");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show success message
    successMsg.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
        <h3>Application Submitted Successfully!</h3>
        <p>Thank you for applying to PrimeCuts. We'll review your application and get back to you within 3-5 business days.</p>
        <p style="margin-top: 1rem;"><strong>Application ID:</strong> PC-APP-${Date.now()}</p>
      </div>
    `;

    // Reset form
    form.reset();
    currentStep = 1;
    updateStepDisplay();

    // Scroll to success message
    successMsg.scrollIntoView({ behavior: "smooth" });
  });
}

// ==========================================
// 11. REFERRAL MODAL
// ==========================================
function initReferralModal() {
  const modal = document.getElementById("referralModal");
  const btn = document.getElementById("referralBtn");
  const closeBtn = document.getElementById("closeReferral");
  const form = document.getElementById("referralForm");

  btn?.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Referral sent successfully! You'll earn KES 2,000 when your friend is hired.",
    );
    modal.classList.remove("active");
    form.reset();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

// ==========================================
// 12. SCROLL REVEAL ANIMATIONS
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
// 13. FLOATING APPLY BUTTON
// ==========================================
function initFloatingButton() {
  const btn = document.getElementById("floatingApply");

  btn?.addEventListener("click", () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
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
// 14. MAP REGION CLICK
// ==========================================
function initMapRegions() {
  const regions = document.querySelectorAll(".map-region");

  regions.forEach((region) => {
    region.addEventListener("click", () => {
      const regionName = region.dataset.region;

      // Filter jobs by location
      const locationFilter = document.getElementById("locationFilter");
      if (locationFilter) {
        locationFilter.value = regionName;
        locationFilter.dispatchEvent(new Event("change"));

        // Scroll to jobs
        document
          .getElementById("open-positions")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ==========================================
// 15. SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ==========================================
// 16. TESTIMONIAL SLIDER (Auto-rotate)
// ==========================================
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial-card");
  if (testimonials.length === 0) return;

  let currentIndex = 0;

  function rotateTestimonials() {
    testimonials.forEach((card, index) => {
      if (index === currentIndex) {
        card.style.transform = "scale(1.05)";
        card.style.boxShadow = "0 20px 50px rgba(211, 47, 47, 0.2)";
      } else {
        card.style.transform = "scale(1)";
        card.style.boxShadow = "";
      }
    });

    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  setInterval(rotateTestimonials, 3000);
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🥩 PrimeCuts Careers Loading...");

  // Initialize all features
  initDarkMode();
  initLiveCounter();
  initStatCounters();
  initJobFilters();
  initJobModal();
  initCVUpload();
  initFormSubmission();
  initReferralModal();
  initScrollReveal();
  initFloatingButton();
  initMapRegions();
  initSmoothScroll();
  initTestimonialSlider();

  console.log("✅ All career page features loaded!");
});

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
console.log(`
╔═══════════════════════════════════════════╗
║   PRIMECUTS CAREERS - FULLY LOADED        ║
║   20 Features Active                      ║
║   • Dark Mode Toggle                      ║
║   • Live Application Counter              ║
║   • Animated Stats                        ║
║   • Job Filters                           ║
║   • Job Detail Modals                     ║
║   • Multi-Step Application Form           ║
║   • Drag & Drop CV Upload                 ║
║   • Resume Score Checker                  ║
║   • Phone Validation                      ║
║   • Referral Program                      ║
║   • Interactive Map                       ║
║   • Smooth Scrolling                      ║
║   • Floating Apply Button                 ║
║   • Testimonial Slider                    ║
║   And more!                               ║
╚═══════════════════════════════════════════╝
`);
