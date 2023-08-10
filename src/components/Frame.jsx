import styled from 'styled-components';

/** 모바일 환경 최적화 프레임 */
const Frame = ({ children, ...props }) => {
    return <Container {...props}>{children}</Container>;
};

const Container = styled.div`
    max-width: 425px;
    width: 100vw;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
`;

export default Frame;
