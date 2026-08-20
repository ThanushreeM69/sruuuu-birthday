// ============================================================
// SRUUUU BIRTHDAY WEBSITE
// Converted from the edited Tkinter Python program.
// ============================================================

const SISTER_NAME = "Sruuuu";

const BIRTHDAY_DATE = "2026-08-20";
const BIRTHDAY_TIME = "14:28:00";

const PASSWORD = "2023";

const FILES = {
  pandaVideo: "Videos/panda_intro.mp4",
  dollVideo: "Videos/birthday_doll.mp4.mp4",

  memoryVideos: [
    "Videos/video1.mp4",
    "Videos/video2.mp4"
  ],

  clickedPhoto: "SPECIAL/clicked_photo.jpeg",
  music: "Music/birthday_music.mp3"
};

// ============================================================
// YOUR EXACT CAPTIONS FROM THE PYTHON CODE
// ============================================================

const CAPTIONS = [
  "Little feet, endless energy, and a heart already full of dreams. ✨💗",
  "Sleepy eyes, that beautiful laugh… the little sunshine she always was. 🥹",
  "Our little Krishna — innocent, mischievous, and loved beyond words. 🦚✨",
  "Once her whole world fit perfectly in Amma’s arms. 🤍🥹",
  "Growing up surrounded by the two people who made every birthday,\nevery dream, and every little moment special.❤️🦋",
  "From the little girl they held in their arms to the woman who made\ntheir dreams come true — their proudest chapter. 🎓❤️✨",
  "An elder sister by age, but forever our guide, our protector, and our\nfavourite person to annoy. 😂🫶🏻❤️",
  "And now, a new chapter begins… from being someone’s little girl\nand our big sister to becoming someone’s forever.\nMay this chapter be as beautiful as everything\nthat brought her here. 🥹🤍✨"
];

// ============================================================
// YOUR EXACT LETTER FROM THE PYTHON CODE
// ============================================================

const LETTER_TEXT = `Dear Sruuuu,

Today is your special day, and I just want you to know how
much you mean to me. Thank you for all the laughs, memories,
and crazy moments we have shared.

Happiest birthday, Sruuuu! 🥹❤️ Missing you so much! I really wish I could have been there with you today, but that’s okay—just enjoy your day to the fullest! 🫶🏻✨
You have always been one of the best people in my life. I never realized how important you were to me until you went to the hostel.
The way I used to ask for your opinion about everything, call you for every little thing, and share every moment with you—
I realize now that all those little things were actually priceless. ❤️

They always say, “You understand someone’s value when you are far away from them,” and that’s exactly what happened with us.
Distance made me realize just how much you mean to me. 🥹💗
And now, you’re stepping into a beautiful new journey—from Miss to Mrs. 🥹💍✨ I wanted to do so many things for you, but with whatever I could manage, I’ve tried my best.
I just hope you love it and enjoy every little moment. ❤️

Enjoy this last bachelor birthday, Sruuuu! 😂❤️ Make the most of it, smile a lot, enjoy every second, and make the best memories.
Missing you more than I can say. Happiest birthday once again, my Sruuuu! 🥹❤️ Love you always! 🫂✨

With lots of love ❤️`;

const app = document.getElementById("app");
const music = document.getElementById("backgroundMusic");

let musicStarted = false;
let passwordAttempts = 0;
let screenTimer = null;

// ============================================================
// SCREEN / BACKGROUND
// ============================================================

function clearTimer() {
  if (screenTimer) {
    clearTimeout(screenTimer);
    screenTimer = null;
  }
}

function render(inner, options = {}) {
  clearTimer();

  const letter = options.letter ? "letter-screen" : "";
  const heart = options.heart ? "heart-screen" : "";

  app.innerHTML = `
    <section class="screen ${letter} ${heart}">
      ${options.noBackground ? "" : background()}
      ${inner}
    </section>
  `;
}

function background() {
  const stars = [
    [7, 12], [18, 24], [88, 13], [95, 31], [12, 78],
    [88, 76], [25, 89], [76, 91], [39, 11], [63, 14]
  ];

  const starHtml = stars.map(([x, y], i) => `
    <span class="star"
      style="left:${x}%;top:${y}%;font-size:${12 + (i % 4) * 3}px;color:${["#FF7EAA","#C8B5FF","#FFE08A","#8BDDF5"][i%4]}">
      ${["✦","✧","⋆","♡"][i%4]}
    </span>
  `).join("");

  const balloons = [
    ["#FF7EAA", 7, 75, 0],
    ["#C8B5FF", 88, 72, 2],
    ["#FFB58A", 17, 35, 4]
  ].map(([color, left, top, delay]) => `
    <span class="balloon"
      style="background:${color};left:${left}%;top:${top}%;animation-delay:${delay}s">
    </span>
  `).join("");

  return `<div class="background"></div>${starHtml}${balloons}`;
}

function button(text, className, action) {
  return `<button class="${className}" onclick="${action}">${text}</button>`;
}

function startMusic() {
  if (musicStarted) return;

  music.src = FILES.music;

  music.play()
    .then(() => {
      musicStarted = true;
    })
    .catch(() => {
      // Browser autoplay may be blocked until a user clicks.
    });
}
    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);

// ============================================================
// HEART INTRO
// Same idea as the Python heart_intro(): tiny "I love you"
// messages gradually form a heart.
// ============================================================

function heartIntro() {
  render(`
    <div class="heart-title">For my Sruuuu ❤️</div>
    <div class="heart" id="heart"></div>
  `, {heart: true, noBackground: true});

  const heart = document.getElementById("heart");
  const points = [];

  for (let i = 0; i < 720; i++) {
    const t = (i / 720) * Math.PI * 2;

    const x = 16 * Math.sin(t) ** 3;
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    points.push([x, -y]);
  }

  const visible = points.filter((_, i) => i % 3 === 0);

  visible.forEach(([x, y], i) => {
    const item = document.createElement("span");
    item.className = "love-word";
    item.textContent = "I love you";

    const px = 50 + x * 1.6;
    const py = 50 + y * 1.6;

    item.style.left = `${px}%`;
    item.style.top = `${py}%`;
    item.style.color =
      ["#FF7EAA", "#FFD0E0", "#FFB58A", "#C8B5FF"][i % 4];
    item.style.animationDelay = `${i * 0.035}s`;

    heart.appendChild(item);
  });

  screenTimer = setTimeout(countdownScreen, visible.length * 35 + 2200);
}

// ============================================================
// COUNTDOWN
// ============================================================

function countdownScreen() {
  render(`
    <div class="content">
      <h1 class="title">🎂 GET READY 🎂</h1>
      <div class="name">${SISTER_NAME}</div>

      <p class="subtitle">The surprise starts in...</p>

      <div id="timer" class="timer">00 : 00 : 00 : 00</div>

      <p class="subtitle">
        Days : Hours : Minutes : Seconds
      </p>
    </div>
  `);

  const timer = document.getElementById("timer");

  // The exact date/time you entered above
  const target = new Date(
    `${BIRTHDAY_DATE}T${BIRTHDAY_TIME}`
  );

  function updateCountdown() {
    const now = new Date();
    const remaining = target - now;

    // Target time has arrived
    if (remaining <= 0) {
      timer.textContent = "00 : 00 : 00 : 00";

      // Start the birthday sequence immediately
      setTimeout(() => {
        birthdayScreen();
      }, 500);

      return;
    }

    const days = Math.floor(remaining / 86400000);

    const hours = Math.floor(
      (remaining % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (remaining % 3600000) / 60000
    );

    const seconds = Math.floor(
      (remaining % 60000) / 1000
    );

    timer.textContent =
      `${String(days).padStart(2, "0")} : ` +
      `${String(hours).padStart(2, "0")} : ` +
      `${String(minutes).padStart(2, "0")} : ` +
      `${String(seconds).padStart(2, "0")}`;

    screenTimer = setTimeout(updateCountdown, 1000);
  }

  updateCountdown();
}
// ============================================================
// BIRTHDAY SCREEN
// ============================================================

function birthdayScreen() {
  startMusic();

  render(`
    <div class="content">
      <h1 class="big">🎉 HAPPY BIRTHDAY 🎉</h1>
      <div class="name">SRUUUUUU ❤️</div>
      <p class="subtitle">Today is all about YOU ✨</p>
      <p class="normal">So let's see how birthday girl is feeling...</p>
    </div>
  `);

  screenTimer = setTimeout(moodScreen, 6500);
}

// ============================================================
// MOOD
// ============================================================

function moodScreen() {
  render(`
    <div class="content">
      <h1 class="title">How is your mood today? 💗</h1>
      <p class="subtitle">Choose honestly... 👀</p>

      ${button("😊 Happy", "pink", "moodSelected('😊 Happy')")}
      ${button("🥹 Emotional", "lavender", "moodSelected('🥹 Emotional')")}
      ${button("🤪 Crazy", "peach", "moodSelected('🤪 Crazy')")}
      ${button("😴 Sleepy", "blue", "moodSelected('😴 Sleepy')")}
      ${button("😡 Angry", "red", "moodSelected('😡 Angry')")}
      ${button("😎 Chill", "mint", "moodSelected('😎 Chill')")}
    </div>
  `);
}

function moodSelected(mood) {
  startMusic();

  const messages = {
    "😊 Happy": "I knew it! Keep that beautiful smile all day! ❤️",
    "🥹 Emotional": "Don't cry yet Sruuuu... we have more surprises! 🫂",
    "🤪 Crazy": "YESSS! That's exactly the energy I wanted! 🤪",
    "😴 Sleepy": "Wake up birthday girl! The surprises are waiting! 😂",
    "😡 Angry": "Okay okay... no fighting on your birthday! 😂❤️",
    "😎 Chill": "Perfect. Stay chill... because things are about to get crazy! 😏"
  };

  showMessage("Your Mood ❤️", messages[mood], passwordScreen);
}

// ============================================================
// PASSWORD
// ============================================================

function passwordScreen() {
  render(`
    <div class="content">
      <h1 class="title">🔐 SECRET CHECK</h1>
      <p class="subtitle">Let's see if your super brain remembers this 👀</p>

      <input
        id="password"
        type="password"
        maxlength="20"
        autocomplete="off"
        placeholder="Password"
      >

      <div id="hint" class="hint"></div>

      ${button("🔓 UNLOCK", "mint", "checkPassword()")}
    </div>
  `);

  document.getElementById("password").focus();

  document.getElementById("password").addEventListener("keydown", event => {
    if (event.key === "Enter") checkPassword();
  });
}

function checkPassword() {
  const entry = document.getElementById("password");

  if (entry.value === PASSWORD) {
    showMessage(
      "WOWWW! 😳",
      "Ooo... I was NOT knowing that you have this SUPER BRAIN! 🧠😂❤️",
      excitementScreen
    );
    return;
  }

  passwordAttempts++;

  if (passwordAttempts === 1) {
    showMessage(
      "HAHAHA 😂",
      "Ooo I was knowing you will do wrong! 😂",
      () => {
        const hint = document.getElementById("hint");
        if (hint) hint.textContent = "💡 Hint: birthday + age";
        const entryAgain = document.getElementById("password");
        if (entryAgain) entryAgain.value = "";
      }
    );
  } else {
    showMessage(
      "Try Again 😂",
      "I literally gave you the hint! Use that brain! 🧠😂",
      () => {
        const entryAgain = document.getElementById("password");
        if (entryAgain) entryAgain.value = "";
      }
    );
  }
}

// ============================================================
// EXCITEMENT
// ============================================================

function excitementScreen() {
  render(`
    <div class="content">
      <h1 class="title">🔥 Excitement Level?</h1>
      <p class="subtitle">Be honest... 👀</p>

      ${button("🙂 20%", "blue", "excitementSelected('🙂 20%')")}
      ${button("😊 40%", "mint", "excitementSelected('😊 40%')")}
      ${button("🤩 70%", "peach", "excitementSelected('🤩 70%')")}
      ${button("🔥 90%", "pink", "excitementSelected('🔥 90%')")}
      ${button("🤯 100%", "yellow", "excitementSelected('🤯 100%')")}
    </div>
  `);
}

function excitementSelected(level) {
  if (level.includes("100%")) {
    showMessage(
      "OH NOOO 🤯",
      "I KNEW IT! 😂🔥\n\nBut you still don't know what's coming...",
      firstPandaVideo
    );
  } else {
    showMessage(
      "Hmmmm 👀",
      "That excitement is not enough! Let me fix that! 😂",
      firstPandaVideo
    );
  }
}

// ============================================================
// MESSAGE BOX - browser replacement for Tkinter messagebox
// ============================================================

function showMessage(title, message, next) {
  const overlay = document.createElement("div");

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:1000;
    background:rgba(10,6,18,.82);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:20px;
  `;

  overlay.innerHTML = `
    <div style="
      width:min(520px,95vw);
      background:#1A122A;
      border-radius:18px;
      padding:30px;
      text-align:center;
      box-shadow:0 20px 60px rgba(0,0,0,.5);
    ">
      <h2 style="color:#FFE08A;margin-top:0;">${escapeHtml(title)}</h2>
      <p style="
        color:#F8EAF4;
        white-space:pre-line;
        line-height:1.6;
        font-size:17px;
      ">${escapeHtml(message)}</p>
      <button class="mint" id="messageOk">OK ❤️</button>
    </div>
  `;

  document.body.appendChild(overlay);

  document.getElementById("messageOk").onclick = () => {
    overlay.remove();
    setTimeout(next, 1000);
  };
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// ============================================================
// VIDEO PLAYER
// Browser version uses the native HTML5 video player.
// ============================================================

function playVideo(path, afterVideo) {
  render(`
    <div style="position:relative;z-index:10;width:min(900px,94vw);text-align:center;">
      <video id="mainVideo"
             class="media video"
             controls
             playsinline
             autoplay>
        <source src="${path}" type="video/mp4">
      </video>
      <p id="videoError" class="error-note"></p>
    </div>
  `);

  const video = document.getElementById("mainVideo");
  const error = document.getElementById("videoError");

  let done = false;

  function finish() {
    if (done) return;
    done = true;
    setTimeout(afterVideo, 1000);
  }

  video.addEventListener("ended", finish);

  video.addEventListener("error", () => {
    error.textContent =
      `Video not found or cannot be played:\n${path}`;
    setTimeout(finish, 3000);
  });

  video.play().catch(() => {
    // Autoplay can be blocked. The controls remain visible,
    // so the viewer can press play.
  });
}

function firstPandaVideo() {
  playVideo(FILES.pandaVideo, fakeCameraScreen);
}

// ============================================================
// FAKE CAMERA
// ============================================================

function fakeCameraScreen() {
  render(`
    <div class="content">
      <div style="font-size:55px;">🐼</div>
      <h1 class="title">Let me click your photo! 📸</h1>
      <p class="subtitle">Don't move... I am a professional photographer 😂</p>
      <div id="cameraCountdown" class="timer">3</div>
    </div>
  `);

  const countdown = document.getElementById("cameraCountdown");

  let n = 3;

  function tick() {
    if (n > 0) {
      countdown.textContent = n;
      n--;
      setTimeout(tick, 1000);
    } else {
      countdown.textContent = "📸 CLICK!";
      setTimeout(clickedPhotoScreen, 1200);
    }
  }

  tick();
}

// ============================================================
// CLICKED PHOTO
// ============================================================

function clickedPhotoScreen() {
  render(`
    <div class="content">
      <h1 class="title">📸 GOT IT!</h1>

      <img
        class="media photo"
        src="${FILES.clickedPhoto}"
        alt="Clicked photo"
        onerror="this.style.display='none';document.getElementById('photoError').style.display='block';"
      >

      <p id="photoError"
         class="error-note"
         style="display:none;">
         Put clicked_photo.jpeg inside SPECIAL/
      </p>

      <p class="subtitle">🐼 HAHAHAHAHA! LOOK AT YOUUU! 😂❤️</p>
    </div>
  `);

  screenTimer = setTimeout(secondSurpriseVideo, 6000);
}

// ============================================================
// SECOND VIDEO
// ============================================================

function secondSurpriseVideo() {
  playVideo(FILES.dollVideo, memoryIntro);
}

// ============================================================
// MEMORY INTRO
// ============================================================

function memoryIntro() {
  render(`
    <div class="content">
      <h1 class="title">❤️ NOW FOR THE MEMORIES ❤️</h1>
      <p class="subtitle" style="color:#FFD0E0;">The silly ones...</p>
      <p class="subtitle" style="color:#FFB58A;">The crazy ones...</p>
      <p class="subtitle">And the ones I will always keep close. 🥹</p>
    </div>
  `);

  screenTimer = setTimeout(showMemories, 5000);
}

// ============================================================
// MEMORY PHOTOS
// Browser cannot list a folder automatically.
// Add your photo filenames below in the same order as your
// photos folder. This is the website equivalent of os.listdir()
// + sorted() in the Python program.
// ============================================================

const MEMORY_PHOTOS = [
  "photos/1.jpeg",
  "photos/2.jpeg",
  "photos/3.jpeg",
  "photos/4.jpeg",
  "photos/5.jpeg",
  "photos/6.jpeg",
  "photos/7.jpeg",
  "photos/8.jpeg"
];

function showMemories() {
  if (!MEMORY_PHOTOS.length) {
    memoryVideo(0);
    return;
  }

  showPhoto(0);
}

function showPhoto(index) {
  if (index >= MEMORY_PHOTOS.length) {
    memoryVideo(0);
    return;
  }

  const caption =
    CAPTIONS.length
      ? CAPTIONS[Math.min(index, CAPTIONS.length - 1)]
      : "A memory worth keeping ❤️";

  const photoPath = MEMORY_PHOTOS[index];

  render(`
    <div class="content">
      <img
        class="media photo"
        src="${photoPath}"
        alt="Memory ${index + 1}"
        onerror="document.getElementById('memoryError').textContent='Photo not found: ${photoPath}'"
      >

      <p id="memoryError" class="error-note"></p>

      <p class="subtitle">${escapeHtml(caption)}</p>
    </div>
  `);

  screenTimer = setTimeout(() => showPhoto(index + 1), 6000);
}

// ============================================================
// MEMORY VIDEOS
// ============================================================

function memoryVideo(index) {
  if (index >= FILES.memoryVideos.length) {
    letterIntro();
    return;
  }

  playVideo(
    FILES.memoryVideos[index],
    () => memoryVideo(index + 1)
  );
}

// ============================================================
// LETTER INTRO
// ============================================================

function letterIntro() {
  render(`
    <div class="content">
      <h1 class="title">💌 ONE LAST THING...</h1>
      <p class="subtitle" style="color:#FFD0E0;">
        Something from my heart ❤️
      </p>
    </div>
  `);

  screenTimer = setTimeout(letterScreen, 5000);
}

// ============================================================
// LETTER
// EXACT PYTHON BEHAVIOR:
// white screen, black Georgia text, normal typed letter.
// NO handwritten image and NO letter voice.
// ============================================================

function letterScreen() {
  clearTimer();

  app.innerHTML = `
    <section class="screen letter-screen">
      <div class="letter-box">
        <h2 class="letter-heading">A LETTER FOR YOU ❤️</h2>
        <div class="letter-text" id="letterText"></div>
        <div class="letter-note">With lots of love ❤️</div>
      </div>
    </section>
  `;

  const letterElement = document.getElementById("letterText");
  letterElement.textContent = LETTER_TEXT;

  screenTimer = setTimeout(fullDaySurprise, 30000);
}
// ============================================================
// FULL DAY SURPRISE
// ============================================================

function fullDaySurprise() {
  render(`
    <div class="content">
      <h1 class="title">🐼 OKAY SRUUUU...</h1>

      <p class="subtitle">You thought that was everything? 👀</p>

      <div class="big" style="color:#FF7EAA;">NOOOOO! 😂</div>

      <div class="title" style="font-size:24px;">
        FULL DAY U HAVE WITH MORE SURPRISES 🎁
      </div>

      <p class="subtitle" style="color:#FFD0E0;">
        Enjoy your day ❤️
      </p>

      <p class="normal">
        Laugh a lot. Eat cake. Make memories. 🎂
      </p>
    </div>
  `);

  screenTimer = setTimeout(finalScreen, 8000);
}

// ============================================================
// FINAL SCREEN
// ============================================================

function finalScreen() {
  render(`
    <div class="content">
      <h1 class="big">🎉 HAPPY BIRTHDAY 🎉</h1>

      <div class="name">SRUUUUUU ❤️</div>

      <p class="subtitle">
        You deserve the happiest day. 🥹❤️
      </p>

      <p class="normal">
        And this is only the beginning... ✨
      </p>

      ${button(
        "🎁 ONE LAST SURPRISE",
        "peach",
        "lastSurprise()"
      )}
    </div>
  `);
}

// ============================================================
// LAST SURPRISE
// ============================================================

function lastSurprise() {
  render(`
    <div class="content">
      <h1 class="title">✨ ONE LAST THING ✨</h1>

      <p class="subtitle">
        No matter where life takes us...
      </p>

      <div style="
        color:#FFD0E0;
        font-size:26px;
        font-weight:bold;
        margin:15px 0;
      ">
        YOU WILL ALWAYS BE MY SRUUUU ❤️
      </div>

      <div style="font-size:30px;margin:20px 0;">
        🫂 ❤️ 🐼 ❤️ 🎂
      </div>

      <p class="subtitle" style="color:#FFF9FC;">
        Now go enjoy your day! 🎉
      </p>

      <div class="title" style="font-size:25px;">
        Happy Birthday, Sruuuu! ❤️
      </div>
    </div>
  `);
}

// ============================================================
// START
// ============================================================

heartIntro();
