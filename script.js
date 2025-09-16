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
    // 👇 감지할 대상을 section[id]에서 [id]로 변경하여 div도 포함시킵니다.
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
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
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
});