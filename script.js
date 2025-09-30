document.addEventListener('DOMContentLoaded', () => {
    
    // ----- 1. 커서 제어 코드 -----
    const cursor = document.querySelector('.pointer');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 7.5}px, ${e.clientY - 7.5}px)`;
        });
        document.body.addEventListener('mouseenter', () => {
            cursor.style.opacity = 1;
        });
        document.body.addEventListener('mouseleave', () => {
            cursor.style.opacity = 0;
        });
    }

    // ----- 2. 네비게이션 메뉴 제어 코드 -----
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('div[id], section[id]');

    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.parentElement.classList.add('active');
            }
        });
    };

    // ----- 3. 스크롤 감지 로직 (Intersection Observer) -----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        // 활성화 기준을 다시 50%로 설정합니다. 로직이 개선되어 더 안정적입니다.
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        // --- ▼ 수정된 로직 ---
        // 1. 현재 화면에 보이는 섹션들만 필터링합니다.
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);

        // 2. 화면에 보이는 섹션이 하나라도 있을 경우에만 활성화 로직을 실행합니다.
        if (intersectingEntries.length > 0) {
            // 3. 보이는 섹션들 중 가장 마지막(최신) 섹션을 선택합니다.
            const latestEntry = intersectingEntries[intersectingEntries.length - 1];
            
            let currentId = latestEntry.target.id;
            
            if (currentId === 'interview' || currentId === 'Character') {
                currentId = 'about';
            }

            setActiveLink(currentId);
        }
        // --- ▲ 수정된 로직 ---

    }, observerOptions);

    if (sections.length > 0) {
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // ----- 4. 클릭 이벤트 -----
    if (navLinks.length > 0) {
        // 페이지 첫 로드 시 'Home' 메뉴를 기본 활성화 상태로 설정
        navLinks[0].parentElement.classList.add('active');

        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const targetId = this.getAttribute('href').substring(1);
                if(document.getElementById(targetId)) {
                    setActiveLink(targetId);
                }
            });
        });
    }

    // ----- 5. Functions 섹션 feature 애니메이션 -----
    const functionsSection = document.querySelector('#functions');
    const features = document.querySelectorAll('.feature1, .feature2, .feature3, .feature4');

    if (functionsSection && features.length > 0) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 섹션에 들어올 때 애니메이션 클래스 추가
                    features.forEach(feature => {
                        feature.classList.add('animate');
                    });
                } else {
                    // 섹션을 벗어날 때 애니메이션 클래스 제거
                    features.forEach(feature => {
                        feature.classList.remove('animate');
                    });
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        });

        featureObserver.observe(functionsSection);
    }

});