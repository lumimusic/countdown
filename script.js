// Ngày của các sự kiện
const eventDates = {
    tet: new Date('January 29, 2025 00:00:00').getTime(),
    'new-year': new Date('January 1, 2025 00:00:00').getTime(),
    christmas: new Date('December 25, 2024 00:00:00').getTime(),
    'mid-autumn': new Date('October 6, 2025 00:00:00').getTime(),
    valentine: new Date('February 14, 2025 00:00:00').getTime(),
    'thpt-exam': new Date('June 25, 2025 00:00:00').getTime()
};

// Lời chúc mừng cho từng sự kiện
const eventMessages = {
    tet: "Chúc Mừng Năm Mới! Vạn Sự Như Ý, An Khang Thịnh Vượng",
    'new-year': "Happy New Year! Wishing You a Year Full of Success!",
    christmas: "Merry Christmas! Wishing You Peace and Joy!",
    'mid-autumn': "Chúc Mừng Trung Thu! Mong Bạn Luôn Mạnh Khỏe!",
    valentine: "Happy Valentine! Wishing You Love and Happiness!",
    'thpt-exam': "Chúc Bạn Thành Công Trong Kỳ Thi THPT!"
};

// Tên sự kiện hiển thị
const eventNames = {
    tet: 'Tết Ất Tỵ, 2025',
    'new-year': 'Tết Dương Lịch 2025',
    christmas: 'Giáng Sinh 2024',
    'mid-autumn': 'Trung Thu 2025',
    valentine: 'Valentine 2025',
    'thpt-exam': 'Ngày thi THPT 2025'
};

// Ngày Tết Nguyên Đán cho các năm tiếp theo
const tetDates = [
    new Date('February 17, 2026 00:00:00').getTime(),
    new Date('February 6, 2027 00:00:00').getTime(),
    new Date('January 26, 2028 00:00:00').getTime(),
    new Date('February 13, 2029 00:00:00').getTime(),
    new Date('February 3, 2030 00:00:00').getTime()
];

// Ngày Tết Dương Lịch cho các năm tiếp theo
const newYearDates = [
    new Date('January 1, 2026 00:00:00').getTime(),
    new Date('January 1, 2027 00:00:00').getTime(),
    new Date('January 1, 2028 00:00:00').getTime(),
    new Date('January 1, 2029 00:00:00').getTime(),
    new Date('January 1, 2030 00:00:00').getTime()
];

// Ngày Giáng Sinh cho các năm tiếp theo
const christmasDates = [
    new Date('December 25, 2025 00:00:00').getTime(),
    new Date('December 25, 2026 00:00:00').getTime(),
    new Date('December 25, 2027 00:00:00').getTime(),
    new Date('December 25, 2028 00:00:00').getTime(),
    new Date('December 25, 2029 00:00:00').getTime()
];

// Ngày Trung Thu cho các năm tiếp theo
const midAutumnDates = [
    new Date('October 6, 2026 00:00:00').getTime(),
    new Date('September 25, 2027 00:00:00').getTime(),
    new Date('October 15, 2028 00:00:00').getTime(),
    new Date('October 5, 2029 00:00:00').getTime(),
    new Date('September 24, 2030 00:00:00').getTime()
];

// Ngày Valentine cho các năm tiếp theo
const valentineDates = [
    new Date('February 14, 2026 00:00:00').getTime(),
    new Date('February 14, 2027 00:00:00').getTime(),
    new Date('February 14, 2028 00:00:00').getTime(),
    new Date('February 14, 2029 00:00:00').getTime(),
    new Date('February 14, 2030 00:00:00').getTime()
];

// Ngày thi THPT cho các năm tiếp theo
const thptExamDates = [
    new Date('June 25, 2026 00:00:00').getTime(),
    new Date('June 25, 2027 00:00:00').getTime(),
    new Date('June 25, 2028 00:00:00').getTime(),
    new Date('June 25, 2029 00:00:00').getTime(),
    new Date('June 25, 2030 00:00:00').getTime()
];

let nextTetIndex = 0; // Bắt đầu từ năm tiếp theo
let currentEvent = 'tet'; // Sự kiện mặc định là Tết
let countdownInterval = null;

// Hàm thêm và xóa lớp 'highlight' khi số thay đổi
function addHighlightEffect(element) {
    element.classList.add('highlight');
    setTimeout(() => {
        element.classList.remove('highlight');
    }, 500); // Xóa lớp sau 0.5 giây để hiệu ứng trùng với CSS transition
}

// Hàm cập nhật đồng hồ đếm ngược
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDates[currentEvent] - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Cập nhật các phần tử đồng hồ
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (daysElement.textContent != days) {
        daysElement.textContent = days;
        addHighlightEffect(daysElement.parentElement);
    }
    if (hoursElement.textContent != hours) {
        hoursElement.textContent = hours;
        addHighlightEffect(hoursElement.parentElement);
    }
    if (minutesElement.textContent != minutes) {
        minutesElement.textContent = minutes;
        addHighlightEffect(minutesElement.parentElement);
    }
    if (secondsElement.textContent != seconds) {
        secondsElement.textContent = seconds;
        addHighlightEffect(secondsElement.parentElement);
    }

    // Nếu thời gian hết (đến sự kiện)
    if (timeLeft < 0) {
        clearInterval(countdownInterval);

        // Ẩn đồng hồ đếm ngược của sự kiện hiện tại
        document.querySelector('.countdown').style.visibility = 'hidden';

        // Hiển thị lời chúc cho sự kiện hiện tại
        const newYearMessage = `
            <div class="new-year-message fade-in">
                <h1>${eventMessages[currentEvent]}</h1>
            </div>`;
        document.querySelector('.container').insertAdjacentHTML('beforeend', newYearMessage);

        // Sau 2 phút, ẩn lời chúc và hiển thị lại đồng hồ đếm ngược cho năm tiếp theo
        setTimeout(() => {
            document.querySelector('.new-year-message').classList.add('fade-out');
            setTimeout(() => {
                document.querySelector('.new-year-message').style.display = 'none'; // Ẩn lời chúc

                document.querySelector('.countdown').style.visibility = 'visible'; // Hiển thị lại đồng hồ đếm ngược

                // Chuyển sang ngày của sự kiện tiếp theo và khởi động lại đếm ngược
                nextTetIndex++;
                if (nextTetIndex < tetDates.length) {
                    eventDates[currentEvent] = tetDates[nextTetIndex]; // Cập nhật ngày Tết tiếp theo
                    resetCountdown(); // Khởi động lại đếm ngược cho năm mới
                } else {
                    // Nếu không còn ngày nào trong mảng
                    document.querySelector('.countdown').innerHTML = "<h2>Đã hết các sự kiện đếm ngược!</h2>";
                }
            }, 1000); // Thời gian để hiệu ứng fade-out chạy (1 giây)
        }, 120000); // Sau 2 phút (120000 milliseconds)
    }
}

// Hàm reset đồng hồ khi chuyển sự kiện hoặc bắt đầu lại cho năm mới
function resetCountdown() {
    const countdownElement = document.querySelector('.countdown');

    // Thêm hiệu ứng mờ khi chuyển đồng hồ
    countdownElement.classList.add('fade-out');
    setTimeout(() => {
        countdownElement.innerHTML = `
            <div class="time-box">
                <div class="number" id="days">00</div>
                <div class="label">Ngày</div>
            </div>
            <div class="time-box">
                <div class="number" id="hours">00</div>
                <div class="label">Giờ</div>
            </div>
            <div class="time-box">
                <div class="number" id="minutes">00</div>
                <div class="label">Phút</div>
            </div>
            <div class="time-box">
                <div class="number" id="seconds">00</div>
                <div class="label">Giây</div>
            </div>
        `;

        // Loại bỏ hiệu ứng mờ và bắt đầu cập nhật lại
        countdownElement.classList.remove('fade-out');
        countdownElement.classList.add('fade-in');
        setTimeout(() => countdownElement.classList.remove('fade-in'), 500);

        updateCountdown(); // Cập nhật lại đếm ngược
        countdownInterval = setInterval(updateCountdown, 1000); // Khởi động lại đếm ngược
    }, 500); 
}

// Hàm chuyển đồng hồ đếm ngược khi người dùng chọn sự kiện khác
function switchCountdown() {
    currentEvent = document.getElementById('event-selector').value;
    document.getElementById('event-name').textContent = eventNames[currentEvent];
    resetCountdown();
}

// Khởi tạo đếm ngược ban đầu
countdownInterval = setInterval(updateCountdown, 1000);

// Chức năng chuyển ảnh trong slider (đã có sẵn trong mã bạn cung cấp)
const sliderImages = document.querySelectorAll('.slider-image');
let currentImageIndex = 0; // Chỉ số ảnh hiện tại
const imageChangeInterval = 5000; // Thời gian chuyển ảnh: 5 giây

// Hàm để hiển thị ảnh tiếp theo
function showNextImage() {
    sliderImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
    sliderImages[currentImageIndex].classList.add('active');
}

// Thiết lập khoảng thời gian để tự động chuyển ảnh
setInterval(showNextImage, imageChangeInterval);

// Gọi hiển thị ảnh đầu tiên khi trang tải xong
sliderImages[currentImageIndex].classList.add('active');

// Hàm phát nhạc khi người dùng chọn từ menu thả xuống
function playMusic() {
    const musicMenu = document.getElementById('music-menu');
    const audioPlayer = document.getElementById('audio-player');
    const selectedMusic = musicMenu.value;

    if (selectedMusic) {
        audioPlayer.src = selectedMusic;
        audioPlayer.play();
    }
}
