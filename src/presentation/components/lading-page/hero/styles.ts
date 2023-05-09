import styled from 'styled-components'

export const LargeImg = styled.img`
  height: 120%;
  width: 120%;
`;

export const LargeImgMobile = styled.img`
  height: 100%;
  width: 100%;
`;

export const styles = {
  heroBox: {
    width: '100%',
    display: 'flex',
    minHeight: '600px',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1300px',
    padding: '50px',
  },
  title: {
    paddingBottom: '15px',
  },
  subtitle: {
    opacity: '0.4',
    paddingBottom: '30px',
  },
}