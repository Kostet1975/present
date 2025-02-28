document.addEventListener('DOMContentLoaded', function() {
  // Элементы для переходов между шагами
  const startBtn = document.getElementById('startBtn');
  const nextBtn1 = document.getElementById('nextBtn1');
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  
  // Добавляем класс fade для плавных переходов (opacity + visibility)
  [step1, step2, step3].forEach(section => {
    section.classList.add('fade');
  });
  
  // Начальное состояние: step1 видим, остальные скрыты
  step1.classList.add('visible');
  step2.classList.add('hidden');
  step3.classList.add('hidden');
  
  // При нажатии на кнопку "Нажми на меня" скрываем step1 и плавно показываем step2
  startBtn.addEventListener('click', function() {
    step1.classList.remove('visible');
    step1.classList.add('hidden');
    
    setTimeout(() => {
      step2.classList.remove('hidden');
      step2.classList.add('visible');
    }, 0);
  });
  
  // При нажатии на кнопку "Нажми еще))" скрываем step2 и плавно показываем step3
  nextBtn1.addEventListener('click', function() {
    step2.classList.remove('visible');
    step2.classList.add('hidden');
    
    setTimeout(() => {
      step3.classList.remove('hidden');
      step3.classList.add('visible');
    }, 0);
  });
  
  // Переключение фона и изменение цвета обычного текста и фона кнопок
  document.getElementById("toggleButton").addEventListener("click", function() {
    let body = document.body;
    let text = document.getElementById("text");
    let buttons = document.querySelectorAll(".button");
    let player = document.querySelector(".player");

    // Если текущий фон содержит "2in.jpg" (тёмный фон)
    if (body.style.backgroundImage.includes("2in.jpg")) {
      // Переключаем на светлый фон
      body.style.backgroundImage = "url('2.jpg')";
      text.style.color = "#8d94a0";
      buttons.forEach(btn => {
        btn.style.color = "#8d94a0";
        btn.style.background = "#111"; // Исходный фон кнопок
      });
      player.style.background = "#a0a6ac";
    } else {
      // Переключаем на тёмный фон
      body.style.backgroundImage = "url('2in.jpg')";
      text.style.color = "#bf9d8f";
      buttons.forEach(btn => {
        btn.style.color = "#bf9d8f";
        btn.style.background = "radial-gradient( #472f1b,#575247)"; // Светло-бежевый фон кнопок
      });
      player.style.background = "#bf9d8f";
    }
  });
  
  // Элементы кастомного аудио плеера
  const audioPlayer = document.getElementById('audioPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const progressBar = document.getElementById('progressBar');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const trackTitleEl = document.getElementById('trackTitle');
  const songListItems = document.querySelectorAll('#songList li');
  
  let trackList = [];
  let currentTrackIndex = 0;
  
  // Формируем список треков
  songListItems.forEach((item, index) => {
    trackList.push({
      title: item.textContent,
      src: item.getAttribute('data-src')
    });
    // По клику запускаем выбранный трек
    item.addEventListener('click', function() {
      currentTrackIndex = index;
      loadTrack(currentTrackIndex);
      playTrack();
    });
  });
  
  function loadTrack(index) {
    const track = trackList[index];
    if (!track) return;
    audioPlayer.src = track.src;
    trackTitleEl.textContent = track.title;
  }
  
  function playTrack() {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸';
  }
  
  function pauseTrack() {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
  }
  
  playPauseBtn.addEventListener('click', function() {
    if (audioPlayer.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });
  
  prevBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrackIndex);
    playTrack();
  });
  
  nextBtn.addEventListener('click', function() {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
    playTrack();
  });
  
  audioPlayer.addEventListener('timeupdate', updateProgress);
  
  function updateProgress() {
    if (audioPlayer.duration) {
      const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
      durationEl.textContent = formatTime(audioPlayer.duration);
    }
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }
  
  document.querySelector('.progress-container').addEventListener('click', function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    if (duration) {
      audioPlayer.currentTime = (clickX / width) * duration;
    }
  });
  
  audioPlayer.addEventListener('ended', function() {
    nextBtn.click();
  });
  
  if (trackList.length > 0) {
    loadTrack(currentTrackIndex);
  }
});
  const audioPlayer = document.getElementById("audioPlayer");
  const volumeSlider = document.getElementById("volumeSlider");

  volumeSlider.addEventListener("input", function() {
    audioPlayer.volume = volumeSlider.value;
  });
