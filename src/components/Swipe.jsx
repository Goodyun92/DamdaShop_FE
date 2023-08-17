import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { buttonSwipedState } from '../store/swipeState';
import orderbutton from '../imgs/orderbutton.png';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    background-color: #60996633;
    border-radius: 5px;
`;

const DraggableButton = styled.div`
    position: absolute;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: #416444;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

const P = styled.div`
    font-family: 'pretendard';
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    letter-spacing: -0.30000001192092896px;
    text-align: center;
    color: #416444;
    padding-top: 15px;
`;

const SwipeComponent = () => {
    const setButtonSwiped = useSetRecoilState(buttonSwipedState);
    const [isDragging, setIsDragging] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const containerRef = useRef(null);

    const startDragging = (e) => {
        setIsDragging(true);
        setInitialPosition(e.clientX);
    };

    const dragging = (e) => {
        if (!isDragging) return;

        const movementX = e.clientX - initialPosition;

        // 최대 이동 범위 계산: 컨테이너의 너비 - 버튼의 너비
        const maxMovement = containerRef.current.offsetWidth - 50; // 여기서 50은 버튼의 너비

        // 실제로 이동해야 하는 거리 계산
        const newTranslateX = Math.min(maxMovement, Math.max(0, movementX));

        setTranslateX(newTranslateX);
    };

    const endDragging = () => {
        setIsDragging(false);

        if (containerRef.current && translateX >= containerRef.current.offsetWidth - 50) {
            console.log('Action triggered!'); // 클릭 처리 로직
            setButtonSwiped(true); // Recoil 상태 변경
            setTranslateX(0); // 버튼 초기 위치로 복원
        } else {
            setTranslateX(0); // 버튼 초기 위치로 복원
        }
    };

    return (
        <Container ref={containerRef}>
            <DraggableButton
                style={{ transform: `translateX(${translateX}px)` }}
                onMouseDown={startDragging}
                onMouseMove={dragging}
                onMouseUp={endDragging}
                onMouseLeave={endDragging}
            >
                <img src={orderbutton} />
            </DraggableButton>
            <P>밀어서 주문하기</P>
        </Container>
    );
};

export default SwipeComponent;
