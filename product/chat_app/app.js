const API_BASE_URL = "https://cat-chat-worker.sabasabatabasa.workers.dev";
// Configuration
const CONFIG = {
    STORAGE_KEY: "cat_manager_data"
};

// Data Store
const state = {
    currentStep: -1, // -1: greeting, 0~: questions
    answers: {},
    isTyping: false,
    editingKey: null,
    hasContactForm: false,
    hasReservationForm: false,
    hasBookingOption: false, // Feature Flag
    proposedDefaultSlug: '',
    userId: ''
};

// Iframe Template
const PREVIEW_TEMPLATE = `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <!-- Google Fonts: Kiwi Maru (Warm), Noto Sans JP (Clean/Blue), Shippori Mincho (Simple/Serif) -->
    <link href="https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@400;500&family=Noto+Sans+JP:wght@300;400;500;700&family=Shippori+Mincho:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="preview.css">
    <style>
        body { margin: 0; padding: 0; }
        .preview-booking-modal {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.45);
            z-index: 9999;
            padding: 12px;
        }
        .preview-booking-modal.is-open {
            display: flex;
        }
        .preview-booking-dialog {
            position: relative;
            width: min(640px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
            padding: 16px;
        }
        .preview-booking-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 34px;
            height: 34px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 22px;
            line-height: 1;
            color: #444;
            background: #f0f0f0;
        }
        body.preview-booking-open {
            overflow: hidden;
        }
        .preview-contact-modal {
            position: fixed;
            inset: 0;
            display: none;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.45);
            z-index: 9999;
            padding: 12px;
        }
        .preview-contact-modal.is-open {
            display: flex;
        }
        .preview-contact-dialog {
            position: relative;
            width: min(640px, 100%);
            max-height: 90vh;
            overflow-y: auto;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
            padding: 16px;
        }
        .preview-contact-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 34px;
            height: 34px;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 22px;
            line-height: 1;
            color: #444;
            background: #f0f0f0;
        }
        body.preview-contact-open {
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="preview-content" class="preview-content theme-simple">
        <div class="p-header">
            <div class="p-logo" data-preview="shopName">Store Name</div>
            <nav class="p-nav">
                <span>Service</span><span>About</span><span>Access</span>
            </nav>
        </div>
        <div class="p-hero">
            <div class="p-hero-title" data-preview="shopName">Store Name</div>
            <div class="p-hero-catch" data-preview="catchCopy">キャッチコピーがここに入ります</div>
            <div class="main-image-container" style="display:none">
                <img class="p-hero-img" data-preview="heroImage" src="" alt="No Photo" style="display:none">
            </div>
        </div>
        <div class="p-about">
            <h3>About</h3>
            <p class="p-about-text" data-preview="introduction">
                お店の紹介文がここに入ります。<br>
                お客様に安心してご利用いただけるよう...
            </p>
        </div>
        <div class="p-service">
            <h3 class="p-section-title">Our Services</h3>
            <div class="p-service-grid">
                <div class="p-card">
                    <img class="p-card-img" data-preview="service1Image" src="" alt="No Photo" style="display:none">
                    <div class="p-card-title" data-preview="service1Title">Service 1</div>
                    <div class="p-card-desc" data-preview="service1Desc">Description...</div>
                </div>
                <div class="p-card">
                    <img class="p-card-img" data-preview="service2Image" src="" alt="No Photo" style="display:none">
                    <div class="p-card-title" data-preview="service2Title">Service 2</div>
                    <div class="p-card-desc" data-preview="service2Desc">Description...</div>
                </div>
                <div class="p-card">
                    <img class="p-card-img" data-preview="service3Image" src="" alt="No Photo" style="display:none">
                    <div class="p-card-title" data-preview="service3Title">Service 3</div>
                    <div class="p-card-desc" data-preview="service3Desc">Description...</div>
                </div>
            </div>
        </div>
        <div class="p-info">
            <div class="p-info-box">
                <div class="p-info-column">
                    <div class="p-info-inner">
                        <h4>OPENING HOURS</h4>
                        <div class="p-schedule-area">
                            <p class="p-schedule-line" data-preview="scheduleLine1">平日 9:00 - 18:00</p>
                            <p class="p-schedule-line" data-preview="scheduleLine2">土曜 10:00 - 15:00</p>
                            <p class="p-schedule-note" data-preview="scheduleLine3">日・祝は定休日だにゃ</p>
                        </div>
                        
                        <div class="info-sns">
                            <a href="https://instagram.com" class="sns-icon" aria-label="Instagram" data-preview-link="snsInstagram" target="_blank">
                                <i class="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://x.com" class="sns-icon" aria-label="X (Twitter)" data-preview-link="snsX" target="_blank">
                                <i class="fa-brands fa-x-twitter"></i>
                            </a>
                            <a href="https://facebook.com" class="sns-icon" aria-label="Facebook" data-preview-link="snsFacebook" target="_blank">
                                <i class="fa-brands fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="p-info-column">
                    <div class="p-info-inner">
                        <h4>CONTACT</h4>
                        <p class="p-contact-tel" data-preview="contact">03-1234-5678</p>
                        <p class="p-contact-line" data-preview="lineId">LINE ID: @office_name</p>
                         <button type="button" class="btn-primary btn-contact" style="text-decoration: none;">お問合せ</button>
                         <button type="button" class="btn-primary btn-reserve" style="text-decoration: none; display:none; background-color:#E76F51; margin-left:10px;">ご予約</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-access">
            <h3>Access</h3>
            <p data-preview="address">東京都〇〇区1-2-3</p>
            <div class="p-map">Map</div>
        </div>
        
        <!-- Forms Placeholder -->
        <div id="p-forms-area"></div>

        <footer class="footer p-footer">
            <div class="footer-inner">
                <div class="footer-info">
                    <p class="footer-logo" data-preview="shopName">Store Name</p>

                </div>



                <p class="footer-copy">&copy; <span id="footer-year">2024</span> <span data-preview="shopName">Store Name</span>. All Rights Reserved.</p>
            </div>
        </footer>
    </div>

</body>
</html>
`;

// Questions Definitions
const questions = [
    {
        key: 'template',
        text: 'ホームページのデザインテンプレートを選んでほしいにゃ！\n\n・清潔感のあるブルーベースサイト\n・シンプルなモノトーンサイト\n・温かみのあるクリーム色サイト\n\nどれにするにゃ？',
        icon: 'cat_chat.png',
        placeholder: '例：ブルー',
        options: ['ブルー', 'モノトーン', 'クリーム']
    },
    {
        key: 'shopName',
        previewTarget: '.p-hero',
        text: 'まずは、お店の名前（屋号）を教えてほしいにゃ？',
        icon: 'cat_chat.png',
        placeholder: '例：カフェ・ド・ミケ'
    },
    {
        key: 'catchCopy',
        text: 'フムフム、いい名前だにゃ。\n次は、お店のキャッチコピー（一言でお店の魅力を伝える言葉）を教えてにゃ！',
        icon: 'cat_smile.png',
        placeholder: '例：路地裏の秘密基地カフェ',
        multiline: true
    },
    {
        key: 'heroImage',
        type: 'image',
        text: 'お店の顔になる「メイン画像」を選んでほしいにゃ！\nお客様が最初に見る大切な写真だにゃ。',
        icon: 'cat_smile.png'
    },
    {
        key: 'introduction',
        text: 'なるほど〜！\nそれじゃあ、お店の詳しい紹介文（説明）をお願いするにゃ。\n少し長くなっても大丈夫だにゃ。',
        icon: 'cat_think.png',
        placeholder: 'お店のこだわりやコンセプトなど...',
        previewTarget: '.p-about',
        multiline: true
    },
    {
        key: 'service1Title',
        text: 'ありがとにゃ！お店のイメージが湧いてきたにゃ。\n提供しているサービスを最大3つ教えてほしいにゃ。\nまず1つ目の「サービス名（見出し）」は？',
        icon: 'cat_chat.png',
        previewTarget: '.p-service',
        placeholder: '例：ランチセット'
    },
    {
        key: 'service1Desc',
        text: 'そのサービスの説明を教えてにゃ！',
        icon: 'cat_chat.png',
        placeholder: '例：日替わりのパスタとサラダのセットです。',
        multiline: true
    },
    {
        key: 'service1Image',
        type: 'image',
        text: '1つ目のサービスの写真はアルにゃ？',
        icon: 'cat_chat.png'
    },
    {
        key: 'service2Title',
        text: '2つ目のサービスはあるかにゃ？\n空欄でもOKだにゃ（その場合は非表示になるにゃ）',
        icon: 'cat_think.png',
        placeholder: '例：ディナーコース（または「なし」）'
    },
    {
        key: 'service2Desc',
        text: '2つ目のサービスの説明も教えてにゃ。',
        icon: 'cat_chat.png',
        placeholder: 'サービスの説明',
        multiline: true
    },
    {
        key: 'service2Image',
        type: 'image',
        text: '2つ目のサービスの写真はアルにゃ？',
        icon: 'cat_chat.png'
    },
    {
        key: 'service3Title',
        text: '3つ目のサービスはあるかにゃ？\n空欄でもOKだにゃ（その場合は非表示になるにゃ）',
        icon: 'cat_think.png',
        placeholder: '例：テイクアウト（または「なし」）'
    },
    {
        key: 'service3Desc',
        text: '3つ目のサービスの説明だにゃ。',
        icon: 'cat_chat.png',
        placeholder: 'サービスの説明',
        multiline: true
    },
    {
        key: 'service3Image',
        type: 'image',
        text: '3つ目のサービスの写真はアルにゃ？',
        icon: 'cat_chat.png'
    },
    {
        key: 'scheduleLine1',
        text: '営業案内を教えてほしいにゃ！\nまずは1行目（メインの営業時間など）。\n空欄でもOKだにゃ（その場合は非表示になるにゃ）。',
        icon: 'cat_chat.png',
        previewTarget: '.p-info',
        placeholder: '例：平日 9:00 - 18:00'
    },
    {
        key: 'scheduleLine2',
        text: '営業案内の2行目はあるかにゃ？（定休日など）\n（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：定休日は水曜日'
    },
    {
        key: 'scheduleLine3',
        text: '営業案内の3行目（補足や注釈）はあるかにゃ？\nここは少し薄い文字で表示されるにゃ。\n（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：※祝日は不定休です'
    },
    {
        key: 'snsInstagram',
        text: 'InstagramのURLはあるかにゃ？（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：https://instagram.com/my_shop'
    },
    {
        key: 'snsX',
        text: 'X（旧Twitter）のURLはあるかにゃ？（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：https://x.com/my_shop'
    },
    {
        key: 'snsFacebook',
        text: 'FacebookのURLはあるかにゃ？（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：https://facebook.com/my_shop'
    },
    {
        key: 'contact',
        text: 'お店の電話番号を教えてにゃ。',
        icon: 'cat_chat.png',
        placeholder: '例：03-1234-5678'
    },
    {
        key: 'lineId',
        text: 'LINE公式アカウントのIDはあるかにゃ？\n（なければ空欄でOKだにゃ）',
        icon: 'cat_chat.png',
        placeholder: '例：@my_shop_id'
    },
    {
        key: 'address',
        text: 'お店の住所はどこだにゃ？',
        icon: 'cat_smile.png',
        previewTarget: '.p-access',
        placeholder: '例：東京都〇〇区1-2-3'
    },
    {
        key: 'formContact',
        text: 'ホームページにお問い合わせフォームは設置するにゃ？\n（名前・メール・本文の入力欄ができるにゃ）\n※設置すると、いつでもお客様からの連絡を受け取れるようになるにゃ！',
        icon: 'cat_think.png',
        previewTarget: '#p-forms-area',
        options: ['設置する', '設置しない']
    },
    // Reservation Form injected dynamically based on plan
    {
        key: 'customSlug',
        text: '', // Generated dynamically
        icon: 'cat_chat.png',
        placeholder: '例：my-shop'
    }
];

// DOM Elements
const elements = {
    screens: {
        auth: document.getElementById('auth-screen'),
        chat: document.getElementById('chat-screen')
    },
    chat: {
        history: document.getElementById('chat-history'),
        input: document.getElementById('user-input'),
        textarea: document.getElementById('user-textarea'), // Added textarea
        btn: document.getElementById('send-btn'),
        headerCat: document.querySelector('.header-cat'),
        resetBtn: document.getElementById('reset-btn'),
        optionsArea: null // Will be created dynamically or just use history
    },
    preview: {
        section: document.querySelector('.preview-section'),
        wrapper: document.querySelector('.preview-wrapper'),
        iframe: document.getElementById('preview-frame'), // Iframe
        deviceBtns: document.querySelectorAll('.device-btn'),
        closeBtn: document.getElementById('preview-close-btn')
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    // 認証フラグの確認
    const isVerified = urlParams.get('verified') === 'true';
    const isBookingOption = urlParams.get('booking_option') === 'true'; // Check Option
    const isAdmin = urlParams.get('admin') === 'master_cat';

    if (isVerified || isAdmin) {
        console.log('Verification Success. verified:', isVerified, 'option:', isBookingOption, 'admin:', isAdmin);
        state.hasBookingOption = isBookingOption; // Store state

        // Dynamic Question Construction
        buildQuestionsList();

        setTimeout(() => {
            console.log('Initiating startChat...');
            startChat();
        }, 500);
    } else {
        // ... (Debug fallback logic)
        state.hasBookingOption = true; // Debug: Enable option for testing
        buildQuestionsList(); // Debug

        console.warn("認証が必要だにゃ。");
        setTimeout(() => {
            console.log('No auth params found. Starting in debug mode...');
            addMessage('cat', '認証パラメータが見つからないにゃ...<br>でもテストみたいだから、特別にこのまま始めるにゃ！', 'cat_worry.png');
            setTimeout(() => startChat(), 1500);
        }, 500);
    }

    // Chat Event Listeners
    elements.chat.btn.addEventListener('click', handleSendMessage);
    elements.chat.input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
    // Textarea Event
    elements.chat.textarea.addEventListener('keydown', (e) => {
        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Real-time Input
    const handleInput = (e) => {
        const val = e.target.value;

        let currentKey = '';
        if (state.editingKey) {
            currentKey = state.editingKey;
        } else if (state.currentStep >= 0 && state.currentStep < questions.length) {
            currentKey = questions[state.currentStep].key;
        }

        if (currentKey) {
            updatePreview(currentKey, val);
        }
    };
    elements.chat.input.addEventListener('input', handleInput);
    elements.chat.textarea.addEventListener('input', handleInput);

    elements.chat.resetBtn.addEventListener('click', resetChat);

    // Preview and Fullscreen Logic
    elements.preview.deviceBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mode = e.target.dataset.device;
            switchDeviceView(mode);
        });
    });

    if (elements.preview.section && elements.preview.closeBtn) {
        elements.preview.section.addEventListener('click', (e) => {
            if (window.innerWidth > 900) return;
            if (e.target === elements.preview.closeBtn) return;
            elements.preview.section.classList.add('mobile-fullscreen');
        });

        elements.preview.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.preview.section.classList.remove('mobile-fullscreen');
        });
    }

    // Set Footer Year
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Initialize Iframe Content
    initPreviewIframe();
});

function buildQuestionsList() {
    // 1. Remove any existing injected questions to prevent duplicates on reset
    // Actually questions is const, so we can't mutate easily if we want to reset.
    // Better strategy: "questions" variable usually const, but we need to modify it.
    // Since 'const questions' is defined above, we cannot reassign.
    // We should treat 'questions' as the Base, and modify it strictly or use spliced index.

    // Find index of 'customSlug' to insert before it
    const slugIndex = questions.findIndex(q => q.key === 'customSlug');
    if (slugIndex === -1) return;

    // Check if verification/reservation questions already exist (idempotency)
    const hasResQ = questions.find(q => q.key === 'formReservation');

    // Logic:
    // If hasBookingOption is TRUE, we ensure 'formReservation' and details are present.
    // If FALSE, we ensure they are NOT present.

    if (state.hasBookingOption) {
        if (!hasResQ) {
            // Insert Reservation Questions
            const resQuestions = [
                {
                    key: 'formReservation',
                    text: 'おお！予約オプションも申し込んでくれたんだにゃ！\nお客様がネットから予約できるように、予約フォームを設置するにゃ？',
                    icon: 'cat_smile.png',
                    previewTarget: '#p-forms-area',
                    options: ['設置する', '設置しない']
                },
                // Detailed Reservation Questions
                {
                    key: 'bookingHours',
                    text: '予約フォームに表示する「営業時間」を教えてほしいにゃ！',
                    icon: 'cat_chat.png',
                    defaultValue: state.answers.scheduleLine1 || '',
                    placeholder: '例：平日 9:00 - 18:00'
                },
                {
                    key: 'bookingClosedDays',
                    text: '定休日はいつだにゃ？\n予約を受け付けない曜日を教えてほしいにゃ！',
                    icon: 'cat_chat.png',
                    placeholder: '例：水曜日、第3火曜日',
                    multiline: true
                },
                {
                    key: 'bookingDeadline',
                    text: '予約の受付期限についての文章を教えてにゃ！\n（空欄なら表示しないにゃ）',
                    icon: 'cat_chat.png',
                    defaultValue: 'ご予約は2日前まで受け付けております。',
                    placeholder: '例：ご予約は当日の午前中まで受け付けております。',
                    multiline: true
                },
                {
                    key: 'bookingFormat',
                    text: '予約希望の聞き方は「第3希望まで」聞くスタイルでいいかにゃ？\n（お客様が日時を3つ入力してくれるようになるにゃ）',
                    icon: 'cat_think.png',
                    options: ['第3希望まで聞く', '第1希望のみ']
                },
                {
                    key: 'bookingInterval',
                    text: '予約の受付間隔はどうするにゃ？\n（30分ごと、1時間ごと、など）',
                    icon: 'cat_chat.png',
                    options: ['30分単位', '1時間単位', 'フリータイム']
                },
                {
                    key: 'reservationRules',
                    text: '予約フォームに載せる『お店独自のルールや注意書き』はあるかにゃ？\nもちろん、このまま使ってもOKだにゃ！',
                    icon: 'cat_chat.png',
                    multiline: true,
                    defaultValue: '後ほど当店より内容を確認し、正式な予約確定のご案内を差し上げます。\n万が一、2〜3日経過しても返信がない場合は、恐れ入りますがお電話等で一度お問い合わせください。',
                    placeholder: '例：キャンセル料は前日から発生します'
                }
            ];
            // Insert before customSlug
            questions.splice(slugIndex, 0, ...resQuestions);
        }
    } else {
        // If option invalid but questions exist (e.g. debug toggle?), remove them.
        // For now, assume clean start or reload clears memory. 
        // JavaScript memory resets on reload, so 'questions' is clean base const (if defined as let/const globally).
        // Wait, I defined `const questions` in global scope. splice MUTATES it. 
        // So on reload it is clean. On resetChat(), it might be dirty if I don't reload page.
        // My resetChat() does location.reload(), so it is fine.
    }
}

// --- Auth Functions ---
// Removed handleAuth, showAuthError, switchScreen functionality as screen is now static

// --- Chat Logic ---
// Legacy startChat removed



function askNextQuestion() {
    console.log('Asking question step:', state.currentStep);
    try {
        if (state.currentStep < questions.length) {
            const q = questions[state.currentStep];
            console.log('Current Question:', q);

            // Auto-scroll Preview
            if (q.previewTarget) {
                scrollToPreviewElement(q.previewTarget);
            }

            // --- Skip Logic for Service Images/Desc ---
            // If Service Title is "None", skip everything related to it.
            if (q.key === 'service2Desc' && (state.answers['service2Title'] === 'なし' || !state.answers['service2Title'])) {
                state.answers['service2Desc'] = '';
                state.answers['service2Image'] = '';
                // Skip until service3Title (which is +2 steps from service2Desc usually, but let's be safe)
                // service2Desc -> service2Image -> service3Title
                // We need to jump to service3Title.
                // Current step is service2Desc index.
                // We want to skip Desc and Image.
                const nextQIndex = questions.findIndex(quest => quest.key === 'service3Title');
                if (nextQIndex !== -1) {
                    state.currentStep = nextQIndex;
                    askNextQuestion();
                    return;
                }
            }
            if (q.key === 'service2Image' && (state.answers['service2Title'] === 'なし' || !state.answers['service2Title'])) {
                state.currentStep++; // Should have been handled above, but fallback
                askNextQuestion();
                return;
            }


            if (q.key === 'service3Desc' && (state.answers['service3Title'] === 'なし' || !state.answers['service3Title'])) {
                state.answers['service3Desc'] = '';
                state.answers['service3Image'] = '';
                // Skip to next section (scheduleLine1)
                const nextQIndex = questions.findIndex(quest => quest.key === 'scheduleLine1');
                if (nextQIndex !== -1) {
                    state.currentStep = nextQIndex;
                    askNextQuestion();
                    return;
                }
            }

            // --- Skip Logic for Booking Details ---
            if ((q.key === 'bookingInterval' || q.key === 'bookingClosedDays' || q.key === 'bookingFormat') &&
                state.answers['formReservation'] !== '設置する') {
                state.answers[q.key] = '';
                state.currentStep++;
                askNextQuestion();
                return;
            }

            // --- Dynamic Text for Custom Slug ---
            if (q.key === 'customSlug') {
                const shopSlug = generateProposedSlug(state.answers.shopName);
                if (!state.userId) state.userId = getUserIdFromUrl();
                const shortId = state.userId.slice(0, 5); // Requested 5 chars

                // Reset Preview to default initially (Removed)

                q.text = `URLも作るにゃ！<br>
                屋号に合わせて「<strong>${shopSlug}</strong>」にしてみたにゃ。<br><br>
                <span style="font-size:1.1em;">
                    [ <strong>${shopSlug}</strong> ] <span style="color:#999; font-weight:normal;">.web-ne.com / ${shortId}</span>
                </span><br><br>
                カッコの中の文字は、好きな英語や数字に自由に変えられるにゃ。他の希望があったら教えてにゃ！そのままで良ければ「そのままで」と打ってにゃ。`;

                // Save proposed default for validation
                state.proposedDefaultSlug = shopSlug;
            }

            addMessage('cat', q.text, q.icon);
            // Dynamic Placeholder
            if (q.key === 'customSlug') {
                elements.chat.input.placeholder = `例：${state.proposedDefaultSlug || 'my-shop'}`;
            } else {
                elements.chat.input.placeholder = q.placeholder || '';
            }

            // Toggle Input/Textarea
            if (q.multiline) {
                elements.chat.input.classList.add('hidden');
                elements.chat.textarea.classList.remove('hidden');
                elements.chat.textarea.value = q.defaultValue || '';
                elements.chat.textarea.placeholder = q.placeholder || '';
                // Fix focus timing
                setTimeout(() => {
                    elements.chat.textarea.focus();
                }, 100);
            } else {
                elements.chat.textarea.classList.add('hidden');
                elements.chat.input.classList.remove('hidden');
                elements.chat.input.value = q.defaultValue || '';
                elements.chat.input.placeholder = q.placeholder || '';
                if (q.type !== 'image') elements.chat.input.focus();
            }

            // Handle Image Type
            if (q.type === 'image') {
                elements.chat.input.disabled = true;
                elements.chat.textarea.disabled = true; // Disable both
                elements.chat.input.placeholder = '写真を選んでにゃ'; // Show on input usually
                // Ensure Input is shown for image placeholder look?
                // Actually image upload UI handles interaction, but let's reset to input for look
                elements.chat.textarea.classList.add('hidden');
                elements.chat.input.classList.remove('hidden');

                addImageUploadUI(q.key);
            } else {
                elements.chat.input.disabled = false;
                elements.chat.textarea.disabled = false;
            }

            // Check for options
            if (q.key === 'template') {
                addTemplateSelection(q.options);
            } else if (q.options) {
                addOptions(q.options);
            }
        } else {
            checkCompletion();
        }
    } catch (e) {
        console.error('CRITICAL ERROR in askNextQuestion:', e);
        alert('申し訳ないにゃ。エラーが発生したにゃ。\n' + e.message);
    }
}

function addImageUploadUI(key) {
    const container = document.createElement('div');
    container.className = 'message-options image-upload-container';

    // File Input (Hidden)
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    // Button
    const btn = document.createElement('button');
    btn.className = 'option-btn upload-btn';
    btn.textContent = '📸 写真を選ぶ';

    btn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Resize Image before processing
            resizeImage(file, 800, 0.7, (resizedDataUrl) => {
                // Show Answer Card
                addAnswerCard(key, 'image', resizedDataUrl);

                // Save & Update Preview
                state.answers[key] = resizedDataUrl;
                updatePreview(key, resizedDataUrl);

                // Remove UI
                container.remove();

                // Reset Input
                elements.chat.input.disabled = false;
                elements.chat.input.value = '';

                // Handle Flow
                if (state.editingKey) {
                    state.editingKey = null;
                    if (state.currentStep < questions.length) {
                        addMessage('cat', '続きから始めるにゃ！', 'cat_chat.png');
                        setTimeout(() => askNextQuestion(), 1000);
                    } else {
                        checkCompletion();
                    }
                } else {
                    state.currentStep++;
                    setTimeout(() => askNextQuestion(), 800);
                }
            });
        }
    });

    // Skip Button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'option-btn skip-btn';
    skipBtn.textContent = '写真なしで進む';
    skipBtn.style.marginLeft = '10px';
    skipBtn.style.background = '#f0f0f0';
    skipBtn.style.color = '#666';

    skipBtn.onclick = () => {
        const val = ''; // Empty for no image
        addAnswerCard(key, 'image', val);
        state.answers[key] = val;
        updatePreview(key, val);
        container.remove();
        elements.chat.input.disabled = false;
        elements.chat.input.value = '';

        // Handle Flow
        if (state.editingKey) {
            state.editingKey = null;
            if (state.currentStep < questions.length) {
                addMessage('cat', '続きから始めるにゃ！', 'cat_chat.png');
                setTimeout(() => askNextQuestion(), 1000);
            } else {
                checkCompletion();
            }
        } else {
            state.currentStep++;
            setTimeout(() => askNextQuestion(), 800);
        }
    };

    container.appendChild(btn);
    container.appendChild(skipBtn);
    container.appendChild(fileInput);
    elements.chat.history.appendChild(container);
    scrollToBottomNew();
}

function addTemplateSelection(options) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'message-options template-selector';

    let currentSelection = null;

    // Confirm Button
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'confirm-btn';
    confirmBtn.textContent = 'これで決定にゃ！';
    confirmBtn.disabled = true;

    // Options
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (opt.includes('ブルー')) btn.classList.add('btn-blue');
        if (opt.includes('モノトーン')) btn.classList.add('btn-monotone');
        if (opt.includes('クリーム')) btn.classList.add('btn-cream');
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            currentSelection = opt;
            optionsDiv.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            updatePreview('template', opt);
            confirmBtn.disabled = false;
        });
        optionsDiv.appendChild(btn);
    });

    // Confirm Logic
    confirmBtn.addEventListener('click', () => {
        if (currentSelection) {
            // Manual handling for template which is special
            addAnswerCard('template', 'text', currentSelection);
            state.answers['template'] = currentSelection;
            optionsDiv.remove();

            if (state.editingKey) {
                state.editingKey = null;
                if (state.currentStep < questions.length) {
                    addMessage('cat', '続きから始めるにゃ！', 'cat_chat.png');
                    setTimeout(() => askNextQuestion(), 1000);
                } else {
                    checkCompletion();
                }
            } else {
                state.currentStep++;
                setTimeout(() => askNextQuestion(), 800);
            }
        }
    });

    optionsDiv.appendChild(confirmBtn);
    elements.chat.history.appendChild(optionsDiv);
    scrollToBottomNew();
}

function addOptions(options) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'message-options';

    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
            // For simple options, treat as text input
            elements.chat.input.value = opt;
            handleSendMessage();
            optionsDiv.remove();
        });
        optionsDiv.appendChild(btn);
    });

    elements.chat.history.appendChild(optionsDiv);
    scrollToBottomNew();
}

// --- 2. Advanced Validation (Mock) ---
async function validateContent(text) {
    // A. Forbidden Words
    if (text.includes('死ね') || text.includes('馬鹿')) {
        return 'ニャッ！その言葉は使えないにゃ。別の言葉に変えてにゃ！';
    }
    // B. Suspicious (Scam/Spam) - Mock
    if (text.includes('投資') || text.includes('儲かる')) {
        return 'その内容は少し怪しい匂いがするにゃ...。みんなが安心して見られるサイトにしたいから、書き直してほしいにゃ！';
    }
    // C. Excessive Length
    if (text.length > 1000) {
        return '文字がいっぱいで猫の目も回っちゃうにゃ！もう少しスッキリ短くまとめると、お客さんにも伝わりやすくなるにゃ！';
    }
    return null; // OK
}

async function handleSendMessage() {
    // Prevent re-entry (double submission on long press)
    if (state.isProcessing) return;
    state.isProcessing = true;

    try {
        await processSendMessage();
    } finally {
        state.isProcessing = false;
        // Re-focus input after processing (optional but good for UX)
        if (!elements.chat.textarea.classList.contains('hidden')) {
            elements.chat.textarea.focus();
        } else {
            elements.chat.input.focus();
        }
    }
}

async function processSendMessage() {
    // Determine active input
    let text = '';
    const isTextarea = !elements.chat.textarea.classList.contains('hidden');

    if (isTextarea) {
        text = elements.chat.textarea.value.trim();
    } else {
        text = elements.chat.input.value.trim();
    }

    // Determine Key EARLY for validation
    let currentKey = '';
    if (state.editingKey) {
        currentKey = state.editingKey;
    } else if (state.currentStep >= 0 && state.currentStep < questions.length) {
        currentKey = questions[state.currentStep].key;
    } else {
        return;
    }

    // Validation: Allow empty for optional fields
    const optionalKeys = [
        'snsInstagram', 'snsX', 'snsFacebook',
        'scheduleLine1', 'scheduleLine2', 'scheduleLine3',
        'lineId', 'service2Title', 'service3Title',
        'bookingClosedDays', // Just in case
        'bookingDeadline',
        'bookingHours'
    ];

    // If text is empty AND key is NOT optional, block
    if (!text && !optionalKeys.includes(currentKey)) {
        return;
    }

    // --- AI Moderation Check ---
    state.isTyping = true;
    try {
        const response = await fetch(`${API_BASE_URL}/api/moderate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        if (response.ok) {
            const { flagged, categories } = await response.json();
            if (flagged) {
                // Block Message
                if (categories.harassment || categories.hate) {
                    addMessage('cat', 'ニャッ！その言葉は使えないにゃ。別の言葉に変えてにゃ！', 'cat_worry.png');
                } else {
                    addMessage('cat', 'その内容は少し怪しい匂いがするにゃ...。みんなが安心して見られるサイトにしたいから、書き直してほしいにゃ！', 'cat_worry.png');
                }
                return;
            }
        }
    } catch (e) {
        console.error("Moderation error:", e);
    } finally {
        state.isTyping = false;
    }

    // Length Check
    if (text.length > 1000) {
        addMessage('cat', '文字がいっぱいで猫の目も回っちゃうにゃ！もう少しスッキリ短くまとめると、お客さんにも伝わりやすくなるにゃ！', 'cat_worry.png');
        return;
    }

    // Remove any existing options
    const existingOptions = elements.chat.history.querySelector('.message-options');
    if (existingOptions && !existingOptions.classList.contains('image-upload-container')) {
        existingOptions.remove();
    }

    // Add Answer Card (User)
    // If empty text, maybe show "(なし)" or just empty bubble? Or skip?
    // Let's show as is (empty string might look weird in bubble)
    // If empty, display "(未設定)" or similar for clarity? user usually expects "Blank"
    // Let's display text if present, or "（なし）" if empty to indicate skip?
    // User said "Blank is OK", so usually just proceed.
    // However, addAnswerCard with empty text might fail.
    const displayText = text || '（なし）';
    addAnswerCard(currentKey, 'text', displayText);

    // Clear Inputs
    elements.chat.input.value = '';
    elements.chat.textarea.value = '';

    // Save Logic
    state.answers[currentKey] = text; // Save original empty string
    updatePreview(currentKey, text);

    // Flow Control
    // Flow Control
    if (state.editingKey) {
        state.editingKey = null;

        // --- Chain Editing Logic for Service 2 ---
        // If Title changed (and not 'なし'), check if Desc is missing
        if (currentKey === 'service2Title' && text && text !== 'なし') {
            if (!state.answers['service2Desc']) {
                setTimeout(() => reAskQuestion('service2Desc'), 600);
                return;
            }
        }
        // If Desc changed, check if Image is missing
        if (currentKey === 'service2Desc') {
            if (!state.answers['service2Image']) {
                setTimeout(() => reAskQuestion('service2Image'), 600);
                return;
            }
        }

        // --- Chain Editing Logic for Service 3 ---
        if (currentKey === 'service3Title' && text && text !== 'なし') {
            if (!state.answers['service3Desc']) {
                setTimeout(() => reAskQuestion('service3Desc'), 600);
                return;
            }
        }
        if (currentKey === 'service3Desc') {
            if (!state.answers['service3Image']) {
                setTimeout(() => reAskQuestion('service3Image'), 600);
                return;
            }
        }

        // Resume Normal Flow
        if (state.currentStep < questions.length) {
            addMessage('cat', '続きから始めるにゃ！', 'cat_chat.png');
            setTimeout(() => askNextQuestion(), 1000);
        } else {
            checkCompletion();
        }
    } else {
        // Special Check for Custom Slug
        if (currentKey === 'customSlug') {
            handleSlugValidation(text, () => {
                state.currentStep++;
                setTimeout(() => askNextQuestion(), 800);
            });
            return; // Wait for validation
        }

        // Normal Flow
        state.currentStep++;
        setTimeout(() => {
            askNextQuestion();
        }, 800);
    }
}

function handleSlugValidation(text, successCallback) {
    // 1. Check for "keep default"
    if (text === 'そのままで' || text === 'そのまま') {
        const defaultSlug = state.proposedDefaultSlug || generateProposedSlug(state.answers.shopName);
        state.answers.finalSlug = defaultSlug;
        state.answers.customSlug = defaultSlug; // Required for completion check
        state.answers.useCustom = false;
        successCallback();
        return;
    }

    // 2. Validate Format
    const slug = text.trim();
    if (!/^[a-z0-9-]+$/i.test(slug)) {
        addMessage('cat', '半角英数字で教えてほしいにゃ！<br>（日本語や記号は使えないにゃ）', 'cat_worry.png');
        return;
    }

    // 3. Check Availability (Mock)
    checkSlugAvailability(slug).then(isAvailable => {
        if (isAvailable) {
            state.answers.finalSlug = slug;
            state.answers.customSlug = slug; // Required for completion check
            state.answers.useCustom = true;
            successCallback();
        } else {
            addMessage('cat', 'その名前はもう誰かが使ってるみたいだにゃ...<br>別の名前を考えてほしいにゃ！', 'cat_worry.png');
        }
    });
}

// Mock Worker Check
async function checkSlugAvailability(slug) {
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            // Demo: 'duplicate' is taking
            if (slug === 'duplicate') resolve(false);
            else resolve(true);
        }, 1000);
    });
}

// --- New Logic: Answer Card & Edit ---
function addAnswerCard(key, type, value) {
    const card = document.createElement('div');
    card.className = 'answer-card';

    let contentHtml = '';
    if (type === 'image') {
        if (value) {
            contentHtml = `<img src="${value}" class="answer-card-img" alt="Uploaded Image">`;
        } else {
            contentHtml = `<div class="answer-card-content" style="color:#999;">（写真なし）</div>`;
        }
    } else {
        contentHtml = `<div class="answer-card-content">${value.replace(/\n/g, '<br>')}</div>`;
    }

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '修正する';
    editBtn.onclick = () => showEditListPopup();

    card.innerHTML = contentHtml;
    card.appendChild(editBtn);

    elements.chat.history.appendChild(card);
    scrollToBottomNew();
}

function reAskQuestion(key) {
    const q = questions.find(q => q.key === key);
    if (!q) return;

    state.editingKey = key;

    // Remove Finalize Button if exists (to prevent clicking)
    const finalizeArea = document.querySelector('.finalize-area');
    if (finalizeArea) finalizeArea.remove();

    // Custom Label Map for Edit Messages
    const labelMap = {
        'shopName': '名前（屋号）',
        'introduction': 'お店の詳しい紹介文（説明）',
        'catchCopy': 'お店のキャッチコピー',
        'service2Title': '2つ目のサービス名（見出し）',
        'service3Title': '3つ目のサービス名（見出し）'
    };

    // Custom Full Message for specific keys
    if (key.match(/^service\d+Image$/)) {
        addMessage('cat', 'サービスの写真を選んでにゃ', 'cat_chat.png');
    } else {
        const label = labelMap[key] || q.placeholder || 'これ';
        addMessage('cat', `「${label}」を修正するにゃ？`, 'cat_think.png');
    }

    // UI Handling similar to askNextQuestion
    if (q.type === 'image') {
        elements.chat.input.disabled = true;
        elements.chat.input.placeholder = '写真を選んでにゃ';
        elements.chat.textarea.classList.add('hidden');
        elements.chat.input.classList.remove('hidden');
        addImageUploadUI(q.key);
    } else {
        elements.chat.input.disabled = false;
        elements.chat.textarea.disabled = false;

        if (q.multiline) {
            elements.chat.input.classList.add('hidden');
            elements.chat.textarea.classList.remove('hidden');
            elements.chat.textarea.value = '';
            elements.chat.textarea.placeholder = q.placeholder || '';
            elements.chat.textarea.focus();
        } else {
            elements.chat.textarea.classList.add('hidden');
            elements.chat.input.classList.remove('hidden');
            elements.chat.input.value = '';
            elements.chat.input.placeholder = q.placeholder || '';
            elements.chat.input.focus();
        }
    }

    if (q.key === 'template') {
        addTemplateSelection(q.options);
    } else if (q.options) {
        addOptions(q.options);
    }
}

function checkCompletion() {
    // Check if all required questions have answers
    const required = ['template', 'shopName', 'catchCopy', 'introduction',
        'service1Title', 'service1Desc',
        'address', 'contact', 'formContact', 'customSlug'];

    // Dynamic Requirement for Reservation Form
    // Only require formReservation if the option is enabled (and thus the question was asked)
    if (state.hasBookingOption) {
        required.push('formReservation');
    }

    // Dynamic Requirement for Booking Schedule Details
    if (state.answers['formReservation'] === '設置する') {
        required.push('bookingInterval', 'bookingClosedDays', 'bookingFormat');
    }

    // Strict Check
    const isComplete = required.every(key => {
        // Debug logging for missing keys (optional but helpful)
        const valid = state.answers[key] && state.answers[key].trim() !== '';
        if (!valid) console.log('Missing required key:', key);
        return valid;
    });

    if (!isComplete) {
        return; // Do nothing if incomplete
    }

    // Validation: Contact Info for Forms
    if ((state.answers.formContact === '設置する' || state.answers.formReservation === '設置する') &&
        (state.answers.contact === 'なし' || state.answers.contact === '無し' || state.answers.contact.length < 3)) {

        // Prevent duplicate warning if already last message
        const lastMsg = elements.chat.history.lastElementChild;
        if (lastMsg && lastMsg.textContent.includes('連絡先が必要')) return;

        addMessage('cat', 'フォームを設置するなら、通知を受け取る連絡先が必要だにゃ！<br>「なし」じゃなくて、ちゃんと教えてほしいにゃ。<br>（修正ボタンで直せるにゃ！）', 'cat_worry.png');
        return;
    }

    // Show Finalize Button
    const container = document.createElement('div');
    container.className = 'finalize-area';

    const btn = document.createElement('button');
    btn.className = 'finalize-btn';
    btn.textContent = 'これで完成（最終決定）！';
    btn.onclick = finishChat;

    container.appendChild(btn);

    // Avoid duplicates
    const existing = document.querySelector('.finalize-area');
    if (existing) existing.remove();

    // URL Confirmation
    const slug = state.answers.customSlug || 'site';
    const shortId = (state.userId || '').slice(0, 5);
    const fullUrl = `${slug}.web-ne.com/${shortId}`;

    addMessage('cat', `ではあなたのURLは<br><strong>${fullUrl}</strong><br>になりますにゃ！<br><br>すべて揃いましたにゃ！<br>この内容で看板を出してよろしいですか？`, 'cat_smile.png');
    elements.chat.history.appendChild(container);
    elements.chat.history.scrollTop = elements.chat.history.scrollHeight;

    // Disable input while waiting
    elements.chat.input.disabled = true;
    elements.chat.input.placeholder = '修正する場合は各カードのボタンを押してにゃ';
}

// --- 3. Backend Logic Integration ---
function startChat() {
    // A. ID Generation
    if (!state.uuid) {
        state.uuid = crypto.randomUUID();
    }
    if (!state.shortId) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        state.shortId = id;
    }

    // B. Paid Flag Initialization
    if (typeof state.isPaid === 'undefined') {
        state.isPaid = true; // Default: Paid (Unlocked for User Request)
    }

    console.log('Chat Started:', { uuid: state.uuid, shortId: state.shortId, isPaid: state.isPaid });

    // Start UI
    initPreviewIframe();

    // Clear static history to preventing duplication/phantoms
    if (elements.chat.history) elements.chat.history.innerHTML = '';

    // Add Greeting
    addMessage('cat', 'こんにちは！猫店長だにゃ。<br>これからホームページを作るための情報をいくつか聞くから、教えてほしいにゃ！<br>右側の画面で、出来上がっていく様子が見れるにゃ！', 'cat_chat.png');

    // Initialize Step
    if (state.currentStep === -1) {
        state.currentStep = 0;
    }

    // Force start if step is 0
    if (state.currentStep === 0) {
        askNextQuestion();
    }
}

// --- Auto-scroll Helper ---
function scrollToPreviewElement(selector) {
    const iframe = elements.preview.iframe;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc) return;

    const target = doc.querySelector(selector);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
}

function initPreviewIframe() {
    const iframe = document.getElementById('preview-frame');
    console.log('Initializing Iframe. Found:', iframe);
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(PREVIEW_TEMPLATE);
    doc.close();
    console.log('Iframe content written.');
}

function updatePreview(key, value) {
    const iframe = elements.preview.iframe;
    if (!iframe) return;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc) return;

    // --- 1. テンプレート切り替え ---
    if (key === 'template') {
        const content = doc.getElementById('preview-content');
        if (content) {
            content.classList.remove('theme-blue', 'theme-simple', 'theme-cream');
            let themeName = 'theme-cream';
            if (value.includes('ブルー') || value.includes('blue')) themeName = 'theme-blue';
            else if (value.includes('モノトーン') || value.includes('simple')) themeName = 'theme-simple';
            else if (value.includes('クリーム') || value.includes('cream')) themeName = 'theme-cream';
            content.classList.add(themeName);
        }
        return;
    }

    // --- 2. フォーム（お問合せ・予約）の切り替え ---
    if (key === 'formContact' || key === 'formReservation' ||
        key === 'bookingInterval' || key === 'bookingClosedDays' || key === 'bookingFormat') {
        updateFormsInPreview(doc);
        return;
    }

    // --- 3. 住所（Googleマップ：リンク方式 + Embed） ---
    if (key === 'address') {
        const mapContainer = doc.querySelector('.p-map');
        if (!mapContainer) return;

        if (value && value !== 'なし' && value !== '') {
            // Embed URL for iframe (Legacy Format)
            // t=m (Map), z=15 (Zoom)
            const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(value)}&output=embed&t=m&z=15`;
            // Link for external open (Universal)
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;

            mapContainer.innerHTML = `
                <div style="position: relative; width: 100%; height: 100%; min-height: 250px; background: #f0f0f0;">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        style="border:0; position: absolute; top:0; left:0; width:100%; height:100%;" 
                        src="${embedUrl}" 
                        loading="lazy"
                        allowfullscreen>
                    </iframe>
                    <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(255,255,255,0.9); padding: 5px; text-align: center; border-top: 1px solid #ddd;">
                         <a href="${mapUrl}" target="_blank" rel="noopener" style="color:#007bff; font-weight:bold; text-decoration:none; font-size:0.9em;">
                            📍 うまく表示されない場合はこちら (Googleマップで見る)
                        </a>
                    </div>
                </div>
            `;
            mapContainer.style.background = "none";
        } else {
            mapContainer.innerHTML = 'Map';
            mapContainer.style.background = "#eee";
        }
        return;
    }

    // --- 4. 営業時間の表示/非表示 ---
    if (key.startsWith('scheduleLine')) {
        const targets = doc.querySelectorAll(`[data-preview="${key}"]`);
        targets.forEach(el => {
            if (value === 'なし' || value === '') {
                el.textContent = '';
            } else {
                el.textContent = value;
            }
        });
        return;
    }

    // --- 5. SNSリンクの反映 ---
    if (key.startsWith('sns')) {
        const targets = doc.querySelectorAll(`[data-preview-link="${key}"]`);
        targets.forEach(target => {
            if (!value || value === 'なし' || value === '') {
                target.style.display = 'none';
            } else {
                target.href = value;
                target.style.display = '';
            }
        });
        return;
    }

    // --- 6. サービスカードの表示/非表示 ---
    if (key.match(/^service\d+Title$/)) {
        const titleTarget = doc.querySelector(`[data-preview="${key}"]`);
        if (titleTarget) {
            const card = titleTarget.closest('.p-card');
            if (card) {
                if (!value || value === 'なし') {
                    card.style.display = 'none';
                    return;
                } else {
                    card.style.display = '';
                }
            }
        }
    }

    // --- 7. 一般的なテキスト・画像の反映 ---
    if (value === "なし") return;

    const targets = doc.querySelectorAll(`[data-preview="${key}"]`);
    targets.forEach(el => {
        if (el.tagName.toLowerCase() === 'img') {
            if (value && value !== 'なし') {
                el.src = value;
                el.style.display = 'block';
                if (key === 'heroImage') {
                    const container = el.closest('.main-image-container');
                    if (container) container.style.display = 'block';
                }
            } else {
                el.style.display = 'none';
                if (key === 'heroImage') {
                    const container = el.closest('.main-image-container');
                    if (container) container.style.display = 'none';
                }
            }
        } else {
            // Text logic
            if (key === 'introduction' || key.includes('Desc') || key === 'reservationRules' || key === 'bookingClosedDays' || key === 'bookingDeadline') {
                el.innerHTML = value.replace(/\n/g, '<br>');
            } else {
                el.textContent = value;
            }
        }

        // Highlight animation
        el.classList.add('highlight-flash');
        setTimeout(() => el.classList.remove('highlight-flash'), 500);
    });
}
function updateFormsInPreview(doc) {
    const container = doc.getElementById('p-forms-area');
    if (!container) return;

    let html = '';

    // Contact Form
    if (state.answers['formContact'] === '設置する') {
        html += `
        <div class="preview-contact-modal" id="preview-contact-modal" aria-hidden="true">
            <div class="preview-contact-dialog" role="dialog" aria-modal="true" aria-label="お問い合わせフォーム">
            <button type="button" class="preview-contact-close" data-preview-contact-close aria-label="閉じる">×</button>
            <div class="p-form-container" style="margin-top:0;">
            <h3>お問い合わせ</h3>
            <div class="p-form-group">
                <label class="p-form-label">お名前</label>
                <input type="text" class="p-form-input" placeholder="山田 太郎">
            </div>
            <div class="p-form-group">
                <label class="p-form-label">メールアドレス</label>
                <input type="email" class="p-form-input" placeholder="example@email.com">
            </div>
            <div class="p-form-group">
                <label class="p-form-label">お問い合わせ内容</label>
                <textarea class="p-form-textarea" rows="4"></textarea>
            </div>
            <button class="p-form-btn">送信する</button>
            </div>
            </div>
        </div>`;
    }

    // Toggle Contact Button in Info Header (if exists)
    const contactBtn = doc.querySelector('.btn-contact');
    if (contactBtn) {
        if (state.answers['formContact'] === '設置する') {
            contactBtn.style.display = ''; // Show (default CSS)
        } else {
            contactBtn.style.display = 'none'; // Hide
        }
    }

    // Toggle Reservation Button in Info Header (if exists)
    const reserveBtn = doc.querySelector('.btn-reserve');
    if (reserveBtn) {
        if (state.answers['formReservation'] === '設置する') {
            reserveBtn.style.display = ''; // Show
        } else {
            reserveBtn.style.display = 'none'; // Hide
        }
    }

    // Reservation Form (Detailed)
    if (state.answers['formReservation'] === '設置する') {
        const interval = state.answers['bookingInterval'] || '1時間単位';
        const closed = state.answers['bookingClosedDays'] ? state.answers['bookingClosedDays'].replace(/\n/g, '<br>') : '不定休';
        const isMulti = state.answers['bookingFormat'] === '第3希望まで聞く' || !state.answers['bookingFormat']; // Default true

        // Generate Time Input HTML (Select or Input) based on interval
        let timeInputHtml = '';
        if (interval === '1時間単位' || interval === '30分単位') {
            // Hour Options (0-23)
            let hourOpts = '<option value="">--</option>';
            for (let h = 0; h < 24; h++) {
                const hh = h.toString().padStart(2, '0');
                hourOpts += `<option value="${hh}">${hh}</option>`;
            }
            // Minute Options
            let minOpts = '';
            if (interval === '1時間単位') {
                minOpts = '<option value="00">00</option>';
            } else {
                minOpts = '<option value="00">00</option><option value="30">30</option>';
            }

            timeInputHtml = `
             <div style="flex:1; display:flex; align-items:center; gap:5px;">
                <select class="p-form-input" required style="padding:5px;">${hourOpts}</select>
                <span>:</span>
                <select class="p-form-input" required style="padding:5px;">${minOpts}</select>
             </div>`;
        } else {
            // Free time (15min step default)
            timeInputHtml = `<input type="time" class="p-form-input" required style="flex:1;">`;
        }

        let dateInputsHtml = '';
        const count = isMulti ? 3 : 1;

        for (let i = 1; i <= count; i++) {
            dateInputsHtml += `
            <div class="p-form-group" style="margin-bottom: 20px; border-bottom: 1px dashed #eee; padding-bottom: 10px;">
                <label class="p-form-label">第${i}希望日時 <span style="color:red; font-size:0.8em;">*</span></label>
                <div style="display:flex; gap:10px;">
                    <input type="date" class="p-form-input" required style="flex:2;">
                    ${timeInputHtml}
                </div>
            </div>`;
        }

        html += `
        <div class="preview-booking-modal" id="preview-booking-modal" aria-hidden="true">
            <div class="preview-booking-dialog" role="dialog" aria-modal="true" aria-label="Web予約フォーム">
            <button type="button" class="preview-booking-close" data-preview-booking-close aria-label="閉じる">×</button>
            <div class="p-form-container" id="preview-booking-form" style="position:relative; margin-top:0;">
            ${!state.isPaid ? `
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(255,255,255,0.85); z-index:10; display:flex; flex-direction:column; justify-content:center; align-items:center; backdrop-filter:blur(3px); border-radius:8px;">
                <div style="font-size:3em;">🔒</div>
                <div style="font-weight:bold; color:#555; margin-top:10px;">有料オプションの契約が必要だにゃ</div>
            </div>
            ` : ''}
            <h3>Web予約</h3>
            <div style="font-size:0.8em; color:#666; margin-bottom:15px; line-height:1.4; background:#f9f9f9; padding:10px; border-radius:4px;">
                予約受付時間: <span data-preview="bookingHours">${(state.answers['bookingHours'] || state.answers['scheduleLine1'] || '平日 9:00 - 18:00')}</span><br>
                定休日: ${closed}<br>
                <span style="display:block; margin-top:5px;" data-preview="bookingDeadline">${(state.answers['bookingDeadline'] || '').replace(/\n/g, '<br>')}</span>
            </div>
            <div style="font-size:0.9em; margin-bottom:30px; line-height:1.6;" data-preview="reservationRules">
                ${(state.answers['reservationRules'] || '').replace(/\n/g, '<br>')}
            </div>
            
            <!-- Dynamic Date/Time Inputs -->
            ${dateInputsHtml}

            <div class="p-form-group">
                <label class="p-form-label">人数</label>
                <select class="p-form-select">
                    <option>1名</option>
                    <option>2名</option>
                    <option>3名以上</option>
                </select>
            </div>
            
            <div class="p-form-group">
                <label class="p-form-label">お名前 <span style="color:red;">*</span></label>
                <input type="text" class="p-form-input" placeholder="山田 花子" required>
            </div>
            <div class="p-form-group">
                <label class="p-form-label">電話番号 <span style="color:red;">*</span></label>
                <input type="tel" class="p-form-input" placeholder="090-1234-5678" required>
            </div>
            <div class="p-form-group">
                <label class="p-form-label">備考欄</label>
                <textarea class="p-form-textarea" rows="3" placeholder="ご質問やご要望があればご記入ください"></textarea>
            </div>

            <button class="p-form-btn">予約リクエストを送信</button>
            </div>
            </div>
        </div>`;
    }

    container.innerHTML = html;

    // Booking modal open/close on preview
    const previewModal = doc.getElementById('preview-booking-modal');
    if (reserveBtn && previewModal) {
        const closeModal = () => {
            previewModal.classList.remove('is-open');
            previewModal.setAttribute('aria-hidden', 'true');
            doc.body.classList.remove('preview-booking-open');
        };

        reserveBtn.onclick = (e) => {
            e.preventDefault();
            previewModal.classList.add('is-open');
            previewModal.setAttribute('aria-hidden', 'false');
            doc.body.classList.add('preview-booking-open');
        };

        previewModal.onclick = (e) => {
            if (e.target === previewModal || e.target.closest('[data-preview-booking-close]')) {
                closeModal();
            }
        };

        doc.onkeydown = (e) => {
            if (e.key === 'Escape' && previewModal.classList.contains('is-open')) {
                closeModal();
            }
        };
    }

    const previewContactModal = doc.getElementById('preview-contact-modal');
    if (contactBtn && previewContactModal) {
        const closeContactModal = () => {
            previewContactModal.classList.remove('is-open');
            previewContactModal.setAttribute('aria-hidden', 'true');
            doc.body.classList.remove('preview-contact-open');
        };

        contactBtn.onclick = (e) => {
            e.preventDefault();
            previewContactModal.classList.add('is-open');
            previewContactModal.setAttribute('aria-hidden', 'false');
            doc.body.classList.add('preview-contact-open');
        };

        previewContactModal.onclick = (e) => {
            if (e.target === previewContactModal || e.target.closest('[data-preview-contact-close]')) {
                closeContactModal();
            }
        };

        doc.onkeydown = (e) => {
            if (e.key === 'Escape') {
                if (previewModal && previewModal.classList.contains('is-open')) {
                    previewModal.classList.remove('is-open');
                    previewModal.setAttribute('aria-hidden', 'true');
                    doc.body.classList.remove('preview-booking-open');
                }
                if (previewContactModal.classList.contains('is-open')) closeContactModal();
            }
        };
    }
}

async function finishChat() {
    state.currentStep = questions.length;

    // 1. Loading
    addMessage('cat', 'よし、今からURLを作ってくるにゃ！<br>ちょっと待っててにゃ...🐾', 'cat_think.png');
    elements.chat.input.disabled = true;
    elements.chat.btn.disabled = true;
    elements.chat.textarea.disabled = true;

    // 2. Generate Slug
    let shopSlug = state.answers.finalSlug || generateProposedSlug(state.answers.shopName);
    shopSlug = shopSlug.toLowerCase();

    const userId = getUserIdFromUrl();

    // 3. Server Request (with Fallback)
    const API_URL = `${API_BASE_URL}/api/save`;
    let finalUrl = '';
    let isApiSuccess = false;

    // Prepare Payload with IDs
    const payload = {
        uuid: state.uuid,
        shortId: state.shortId,
        slug: shopSlug,
        data: {
            ...state.answers,
            isPaid: state.isPaid,
            shortId: state.shortId,
            uuid: state.uuid
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const resData = await response.json();
            if (resData.url) {
                finalUrl = resData.url;
                isApiSuccess = true;
                console.log('Saved to API:', resData);
            }
        } else {
            console.warn('API Save Failed:', response.status);
        }
    } catch (e) {
        console.warn('API Unreachable (Dev Mode):', e);
    }

    // Fallback URL if API failed
    if (!isApiSuccess) {
        const domain = state.answers.useCustom ? '.web-ne.com' : '.web-ne.com/' + userId.slice(0, 5);
        finalUrl = `https://${shopSlug}${domain}`;
    }

    setTimeout(() => {
        addMessage('cat', `お待たせしたにゃ！<br>世界に一つだけの看板（URL）ができたにゃ！`, 'cat_smile.png');

        // Show URL Card
        const urlCard = document.createElement('div');
        urlCard.className = 'answer-card url-display-card';
        urlCard.innerHTML = `
            <div class="answer-card-content">
                <strong>あなたのサイトURL：</strong><br>
                <a href="${finalUrl}" target="_blank" style="color: var(--color-primary); font-weight: bold; word-break: break-all;">${finalUrl}</a>
            </div>
            <button class="option-btn" style="margin-top:10px; width:100%;" onclick="window.open('${finalUrl}', '_blank')">🚀 サイトを見に行く</button>
        `;
        elements.chat.history.appendChild(urlCard);
        elements.chat.history.scrollTop = elements.chat.history.scrollHeight;

        saveData(); // Local Storage
    }, 1500);
}

// Helpers
function generateProposedSlug(text) {
    if (!text) return 'my-shop';

    // 1. Kana to Romaji
    let roman = kanaToRomaji(text);

    // 2. Clean up
    return roman.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-') || `shop-${Math.random().toString(36).substr(2, 5)}`;
}

// Simple Kana to Romaji Map (Partial)
function kanaToRomaji(target) {
    const kanaMap = {
        'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
        'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
        'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
        'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
        'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
        'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
        'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
        'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
        'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
        'ワ': 'wa', 'ヲ': 'o', 'ン': 'n',
        'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
        'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
        'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
        'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
        'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
        'ァ': 'a', 'ィ': 'i', 'ゥ': 'u', 'ェ': 'e', 'ォ': 'o',
        'ッ': 't', // simplified small tsu
        'ャ': 'ya', 'ュ': 'yu', 'ョ': 'yo',
        'ー': '-'
    };

    // Hiragana to Katakana normalization (simple range shift)
    let str = target.replace(/[\u3041-\u3096]/g, ch => String.fromCharCode(ch.charCodeAt(0) + 96));

    let result = '';
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (kanaMap[c]) {
            result += kanaMap[c];
        } else {
            result += c;
        }
    }
    return result;
}

function getUserIdFromUrl() {
    // Mock UUID or get from Params if we had it
    return 'user-' + Math.random().toString(36).substr(2, 9);
}

function saveData() {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(state.answers));
        console.log('Saved Data:', state.answers);
        // Additional: Maybe trigger a file download or server sync here
    } catch (e) {
        console.error('Save failed', e);
        addMessage('cat', 'データの保存に失敗したにゃ...容量がいっぱいかもしれないにゃ。', 'cat_worry.png');
    }
}

function resetChat() {
    if (confirm('最初からやり直すにゃ？入力した内容は消えちゃうにゃ。')) {
        elements.chat.input.disabled = false;
        elements.chat.btn.disabled = false;
        startChat();
        // Reset Preview to default (simple reload or manual reset)
        location.reload();
    }
}

// --- Preview View Switch ---
function switchDeviceView(mode) {
    elements.preview.deviceBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.device-btn[data-device="${mode}"]`).classList.add('active');

    if (mode === 'mobile') {
        elements.preview.wrapper.classList.remove('pc-view');
        elements.preview.wrapper.classList.add('mobile-view');
    } else {
        elements.preview.wrapper.classList.remove('mobile-view');
        elements.preview.wrapper.classList.add('pc-view');
    }
}


// --- URL Preview Helper (Removed) ---
function updateUrlPreview(inputVal, defaultSlug) {
    // Removed
}

// --- UI Helpers ---
function addMessage(type, text, iconSource) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;

    const iconDiv = document.createElement('div');
    iconDiv.className = 'message-icon';

    if (type === 'cat') {
        const img = document.createElement('img');
        img.src = `images/${iconSource}`;
        img.alt = 'cat';
        iconDiv.appendChild(img);
    } else {
        iconDiv.textContent = iconSource;
    }

    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.innerHTML = text.replace(/\n/g, '<br>');

    msgDiv.appendChild(iconDiv);
    msgDiv.appendChild(textDiv);

    elements.chat.history.appendChild(msgDiv);

    // Scroll to bottom
    scrollToBottomNew();
}

function changeCatStatus(iconSource) {
    // Fixed: Do nothing or ensures it stays default.
    // The user requested the header icon to be fixed to 'cat_chat'.
    // Since it's already set in HTML, we can just effectively disable this function's effect on the header,
    // or we can force it to always be 'cat_chat.png' if we really want to be sure.
    // But simply removing the calls (as done above) is cleaner.
    // However, if I keep the function I should make it safe or remove it.
    // For now I will keep it but make it inert or log only, OR just don't call it.
    // I removed the calls above. I will leave the function definition in case we want it later, or I can remove it.
    // I'll leave it but maybe comment out the body or just leave the definition unused.
    const img = document.getElementById('header-cat-img');
    if (img) {
        img.src = `images/cat_chat.png`; // Always ensure it is cat_chat, just in case
    }
}

// --- Image Processing ---
function resizeImage(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = Math.round(height * (maxWidth / width));
                width = maxWidth;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const dataUrl = canvas.toDataURL('image/jpeg', quality);
            callback(dataUrl);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
// --- Pop-up Edit List Logic ---

function showEditListPopup() {
    const editModal = document.getElementById('edit-modal');
    const container = document.getElementById('edit-list-items');
    container.innerHTML = ''; // Reset

    // Loop through questions to maintain order, showing only answered items
    questions.forEach(q => {
        const key = q.key;
        const val = state.answers[key];

        // Skip if not answered or invalid/internal keys
        if (val === undefined || val === null) return;
        // Also skip 'formContact' or 'formReservation' if you don't want them editable here? 
        // User said "All answered items", so let's include them. 
        // But options logic for forms might remain simple text or radio? 
        // For simplicity, let's allow editing text/selects.

        const row = document.createElement('div');

        // Check optional
        const optionalKeys = ['service2Title', 'service2Desc', 'service2Image', 'service3Title', 'service3Desc', 'service3Image', 'scheduleLine1', 'scheduleLine2', 'scheduleLine3', 'lineId', 'snsInstagram', 'snsX', 'snsFacebook', 'bookingClosedDays', 'bookingInterval'];
        const isOptional = optionalKeys.includes(key);
        row.className = 'edit-row';

        const label = document.createElement('label');
        label.className = 'edit-label';
        // Use custom mapping if available, else question text (abbr)
        const labelMap = {
            'template': 'テンプレート',
            'shopName': '名前（屋号）',
            'catchCopy': 'キャッチコピー',
            'heroImage': 'メイン画像',
            'introduction': 'お店の詳しい紹介文',
            'service1Title': 'サービス1：名前',
            'service1Desc': 'サービス1：説明',
            'service1Image': 'サービス1：画像',
            'service2Title': 'サービス2：名前',
            'service2Desc': 'サービス2：説明',
            'service2Image': 'サービス2：画像',
            'service3Title': 'サービス3：名前',
            'service3Desc': 'サービス3：説明',
            'service3Image': 'サービス3：画像',
            'address': '住所',
            'contact': '電話番号',
            'lineId': 'LINE ID',
            'scheduleLine1': '営業時間 (1行目)',
            'scheduleLine2': '営業時間 (2行目)',
            'scheduleLine3': '営業時間 (3行目)',
            'snsInstagram': 'Instagram URL',
            'snsX': 'X (Twitter) URL',
            'snsFacebook': 'Facebook URL',
            'customSlug': '希望URL (Slug)',
            'formContact': 'お問い合わせフォーム',
            'formReservation': '予約フォーム設置',
            'bookingInterval': '予約間隔',
            'bookingClosedDays': '定休日',
            'bookingFormat': '予約希望フォーマット'
        };
        label.textContent = labelMap[key] || key;
        row.appendChild(label);

        // Input based on type
        const inputWrapper = document.createElement('div');
        inputWrapper.style.display = 'flex';
        inputWrapper.style.alignItems = 'center';
        inputWrapper.style.gap = '10px';
        inputWrapper.style.width = '100%';

        if (q.type === 'image') {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'edit-img-container';

            const img = document.createElement('img');
            img.src = val; // Base64
            img.className = 'edit-img-preview';

            const fileBtn = document.createElement('button');
            fileBtn.className = 'btn-file-change';
            fileBtn.textContent = '画像を変更';

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            fileBtn.onclick = () => fileInput.click();

            fileInput.onchange = (e) => {
                const f = e.target.files[0];
                if (f) {
                    resizeImage(f, 800, 0.7, (resizedData) => {
                        img.src = resizedData;
                        updateSingleAnswer(key, resizedData); // Update state & preview
                    });
                }
            };

            imgContainer.appendChild(img);
            imgContainer.appendChild(fileBtn);
            imgContainer.appendChild(fileInput);

            // Delete Btn for Image
            if (isOptional) {
                const delBtn = document.createElement('button');
                delBtn.textContent = '🗑️';
                delBtn.className = 'btn-file-change btn-delete';
                delBtn.style.padding = '8px 12px';
                delBtn.style.color = '#E76F51';
                delBtn.style.marginLeft = '10px';
                delBtn.title = '削除する';
                if (!val) delBtn.style.display = 'none';

                delBtn.onclick = () => {
                    if (confirm('この画像を削除していいかにゃ？')) {
                        img.src = 'images/cat_think.png';
                        img.style.opacity = '0.3';
                        updateSingleAnswer(key, '');
                        delBtn.style.display = 'none';
                    }
                };
                imgContainer.appendChild(delBtn);
            }

            row.appendChild(imgContainer);

        } else if (q.options) {
            const select = document.createElement('select');
            select.className = 'edit-input';
            q.options.forEach(opt => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt;
                if (val === opt) option.selected = true;
                select.appendChild(option);
            });
            select.onchange = (e) => updateSingleAnswer(key, e.target.value);

            inputWrapper.appendChild(select);
            row.appendChild(inputWrapper);

        } else if (q.multiline) {
            const textarea = document.createElement('textarea');
            textarea.className = 'edit-input';
            textarea.value = val;
            textarea.placeholder = q.placeholder || '';
            textarea.oninput = (e) => updateSingleAnswer(key, e.target.value);

            inputWrapper.appendChild(textarea);
            row.appendChild(inputWrapper);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'edit-input';
            input.value = val;
            input.placeholder = q.placeholder || '';
            input.oninput = (e) => updateSingleAnswer(key, e.target.value);

            inputWrapper.appendChild(input);
            row.appendChild(inputWrapper);
        }

        // Delete Btn for Text
        if (isOptional && q.type !== 'image') {
            const delBtn = document.createElement('button');
            delBtn.textContent = '🗑️';
            delBtn.style.background = 'none';
            delBtn.style.border = 'none';
            delBtn.style.cursor = 'pointer';
            delBtn.style.fontSize = '1.2rem';
            delBtn.style.marginLeft = '5px';
            delBtn.style.color = '#E76F51';
            delBtn.title = '削除（空欄にする）';

            delBtn.onclick = () => {
                const inputEl = inputWrapper.querySelector('input, textarea');
                if (inputEl) {
                    inputEl.value = '';
                    updateSingleAnswer(key, '');
                }
            };
            inputWrapper.appendChild(delBtn);
        }

        container.appendChild(row);
    });

    editModal.classList.add('open'); // Show
}

function closeEditListPopup() {
    const editModal = document.getElementById('edit-modal');
    editModal.classList.remove('open');

    // Reaction removed by user request


    // Resume flow if needed (check completion)
    // If we were mid-editing logic? Not anymore.
    // If incomplete, we are just continuing where we left off.
    // If complete, button shows.
    checkCompletion();
}

function updateSingleAnswer(key, value) {
    state.answers[key] = value;
    updatePreview(key, value);
    // Also update any displaying cards in history? 
    // It's complex to find exact card. 
    // User only asked for popup and preview update implicitly.
    // If 'shopName' changes, header should update in preview.
}

// Modify addAnswerCard to use new popup
// We need to override or modify the existing function.
// Since I cannot rewrite the middle of the file easily without potentially breaking,
// I will REDEFINE addAnswerCard here at the end. Javascript allows this (hoisting/overwriting).
// Wait, function declarations are hoisted. Redefining at bottom might work or conflict depending on strict mode/modules.
// This is not a module, just script. Subsequent definition replaces previous one.
// Let's rely on that behavior or just replace the original function content if possible.
// Actually, I should use replace_file_content on the original function to be safe.

// I will insert these NEW functions at the end, and THEN do a separate tool call to modify the original addAnswerCard.
// --- Scroll Helper ---
function scrollToBottom() {
    const history = elements.chat.history;
    const lastMsg = history.lastElementChild;
    const padding = 20; // Extra buffer

    if (lastMsg) {
        // Use scrollIntoView for robust visibility
        lastMsg.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    } else {
        history.scrollTop = history.scrollHeight;
    }
}

function scrollToBottomNew() {
    // Wait for DOM
    setTimeout(() => {
        if (elements.chat.history) {
            elements.chat.history.scrollTop = elements.chat.history.scrollHeight + 100; // Extra buffer
        }
    }, 100);
}
