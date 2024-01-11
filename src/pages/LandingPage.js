import {
  Text,
  Container,
  Button,
  Center,
  VStack,
  Image,
  HStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import QRCode from 'react-qr-code';
import { isMobile } from 'react-device-detect';
import { test2FAData } from '../testData';
import ServiceCard from '../components/ServiceCard';
import { imgProviderSrc } from '../ipfsHelpers';
import { ipfsCids } from '../ipfsCids';

import { Web3Button } from '@web3modal/react';
import { isBrowser } from 'react-device-detect';
import { openInNewTab } from '../helper';
import { getThemeData } from '../theme';

function LandingPage() {
  const logo = (cid, link) => (
    <a href={link} target="_blank">
      <Image
        borderRadius="full"
        boxSize="50px"
        src={imgProviderSrc(isMobile, cid)}
        fallbackSrc={imgProviderSrc(true, cid)}
        margin={2}
      />
    </a>
  );
  const themeData = getThemeData('default');
  return (
    <>
      <Container>
        <Text
          bgGradient={`linear(to-l, ${themeData.color2}, ${themeData.color1})`}
          bgClip="text"
          fontSize="5xl"
          fontWeight="bold"
          marginTop={2}
        >
          Web3 OTP
        </Text>

        <Text fontSize="large" fontWeight="bold">
          Wallet encrypted & 2FA storage solution
        </Text>
        <br></br>
        <Text fontSize={'12px'}>
          Two-factor authentication (2FA) adds an additional layer of protection
          beyond passwords to your web2 and web3 accounts. web3 OTP that
           protects all your accounts by encrypting your 2FA secrets with
          your Wallet's public key before storing on decentralized storage.
          <br />
          When you need 2FA, Web3 OTP generates new dynamic 6 digit OTPs (one
          time passwords) every 30 seconds. That way, you and only you can use
          Wallet OTP to log in to accounts across the web. Sign in to use Wallet
          OTP ⬇️
        </Text>
        <Center my={3}>
          {window.ethereum && (
            <Button padding={'0'} my={2} background={'#7928CA'}>
              <Web3Button
                icon="hide"
                avatar="hide"
                label="Sign in with your wallet"
              />
            </Button>
          )}
          {!window.ethereum && (
            <VStack>
              {isBrowser ? (
                <>
                  <Text>Sign QR to open in Metamask Mobile</Text>
                  <QRCode
                    size={50}
                    style={{ height: 'auto', maxWidth: '50%', width: '50%' }}
                    value="https://metamask.app.link/dapp/wallet-otp.on.fleek.co"
                    viewBox={`0 0 50 50`}
                  />
                </>
              ) : (
                <Button
                  my={4}
                  background={'#7928CA'}
                  onClick={() =>
                    openInNewTab(
                      'https://metamask.app.link/dapp/wallet-otp.on.fleek.co'
                    )
                  }
                >
                  Sign in from Metamask Mobile
                </Button>
              )}
            </VStack>
          )}
        </Center>

        <Center>
          <VStack>
            <Text
              bgGradient={`linear(to-l, ${themeData.color2}, ${themeData.color1})`}
              bgClip="text"
              fontSize={'14px'}
            >
              Web3 OTP has a decentralized stack powered by
            </Text>
            <HStack>
              <Wrap justify={'space-evenly'}>
                {logo(ipfsCids.ens, 'https://ens.domains/')}
                {logo(ipfsCids.lit, 'https://litprotocol.com/')}
                {logo(ipfsCids.polybase, 'https://polybase.xyz/')}
              </Wrap>
            </HStack>
          </VStack>
        </Center>
        <br></br>
      </Container>
      <hr></hr>
      <br></br>

    </>
  );
}

export default LandingPage;
