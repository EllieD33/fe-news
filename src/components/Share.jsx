import { Flex, IconButton } from "@chakra-ui/react";
import { RedditIcon, RedditShareButton, WhatsappIcon, WhatsappShareButton, EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, FacebookIcon, FacebookShareButton } from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

const Share = ({ url, title }) => {
    console.log(url, '<<<URL', title, '<<<title')
    const handleCopy = () => {
        alert('URL copied to clipboard!');
    };

    return (
        <Flex justify="space-around" w="250px">
            <RedditShareButton url={url} title={title}>
                <RedditIcon size={38} round />
            </RedditShareButton>

            <WhatsappShareButton url={url} title={title}>
                <WhatsappIcon size={38} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={url} title={title}>
                <LinkedinIcon size={38} round />
            </LinkedinShareButton>

            <FacebookShareButton url={url} quote={title} >
                <FacebookIcon size={38} round />
            </FacebookShareButton>

            <EmailShareButton url={url} subject={title} body="Check out this post!">
                <EmailIcon size={38} round />
            </EmailShareButton>

            <CopyToClipboard text={url} onCopy={handleCopy}>
                <IconButton aria-label="Copy URL" isRound={true} icon={<FaRegCopy />} />
            </CopyToClipboard>
        </Flex>
    )
}

export default Share;