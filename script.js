// DOM이 모두 로드된 후에 스크립트를 실행합니다.
document.addEventListener('DOMContentLoaded', () => {
    
    const cursor = document.querySelector('.pointer');

    document.addEventListener('mousemove', (e) => {
        //별의 크기(20px)의 절반인 10px로 값을 조정합니다.
        cursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    });

    // 마우스가 웹페이지 안으로 들어왔을 때
    document.body.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1; // 커서를 보이게 함
    });

    // 마우스가 웹페이지 밖으로 나갔을 때
    document.body.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0; // 커서를 숨김
    });

});

document.addEventListener('DOMContentLoaded', () => {
    
    // ----- 기존 커서 코드 (수정 없음) -----
    const cursor = document.querySelector('.pointer');
    // (커서 관련 코드는 생략)

    // ----- 네비게이션 메뉴 제어 코드 -----
    const navMenuItems = document.querySelectorAll('.nav-menu li');

    // 각 메뉴 아이템에 클릭 이벤트를 추가합니다.
    navMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. 모든 메뉴에서 'active' 클래스를 먼저 제거합니다.
            navMenuItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // 2. 방금 클릭한 메뉴에만 'active' 클래스를 추가합니다.
            item.classList.add('active');
        });
    });

    // 페이지 첫 로드 시 'Home' 메뉴를 기본 활성화 상태로 설정합니다.
    if (navMenuItems.length > 0) {
        navMenuItems[0].classList.add('active');
    }
});