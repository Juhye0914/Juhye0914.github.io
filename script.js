// DOM이 모두 로드된 후에 스크립트를 실행합니다.
document.addEventListener('DOMContentLoaded', () => {
    
    // ----- 커서 제어 코드 -----
    const cursor = document.querySelector('.pointer');

    document.addEventListener('mousemove', (e) => {
        // 커서 크기(15px)의 절반인 7.5px을 빼서 중앙에 위치시킵니다.
        cursor.style.transform = `translate(${e.clientX - 7.5}px, ${e.clientY - 7.5}px)`;
    });

    document.body.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1; // 커서를 보이게 함
    });

    document.body.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0; // 커서를 숨김
    });

    // ----- 네비게이션 메뉴 제어 코드 -----
    const navMenuItems = document.querySelectorAll('.nav-menu li');

    // 각 메뉴 아이템에 클릭 이벤트를 추가합니다.
    navMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. 모든 메뉴 아이템에서 'active' 클래스를 제거합니다.
            navMenuItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 2. 방금 클릭한 메뉴 아이템에만 'active' 클래스를 추가합니다.
            item.classList.add('active');
        });
    });

    // 페이지 첫 로드 시 'Home' 메뉴를 기본 활성화 상태로 설정합니다.
    if (navMenuItems.length > 0) {
        navMenuItems[0].classList.add('active');
    }
});