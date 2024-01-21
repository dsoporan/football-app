import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  height: 400px;
  width: 300px;
  max-width: 300px;
  background-image: ${(props) =>
    !props.isCoach
      ? 'url("/images/player-card-template.png")'
      : 'url("/images/coach-card-template.png")'};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
`;

export const PlayerPhoto = styled.img`
  position: absolute;
  top: 60px;
  right: 40px;
  border-radius: 30px;
  width: 150px;
  height: 150px;
`;

export const Badge = styled.img`
  position: absolute;
  top: 15%;
  left: 18%;
  height: 50px;
  width: 50px;
`;
