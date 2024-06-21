import { Flex, IconButton, Box } from "@chakra-ui/react";
import { RedditIcon, RedditShareButton, WhatsappIcon, WhatsappShareButton, EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, FacebookIcon, FacebookShareButton } from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegCopy } from "react-icons/fa";

const Share = ({ url, title }) => {
    const handleCopy = () => {
        alert('URL copied to clipboard!');
    };

    const shareButtonData = [
        { as: RedditShareButton, icon: RedditIcon, label: "Share on Reddit" },
        { as: WhatsappShareButton, icon: WhatsappIcon, label: "Share on WhatsApp" },
        { as: LinkedinShareButton, icon: LinkedinIcon, label: "Share on LinkedIn" },
        { as: FacebookShareButton, icon: FacebookIcon, label: "Share on Facebook" },
        { as: EmailShareButton, icon: EmailIcon, label: "Share via Email" }
    ];

    return (
        <Flex justify="space-around" w="250px">
            {shareButtonData.map((button, index) => (
                <Box
                    key={index}
                    as={button.as}
                    url={url}
                    title={title}
                    rounded="full"
                    _hover={{ transform: "scale(1.1)" }}
                    transition="transform 0.2s"
                    aria-label={button.label}
                >
                    <button.icon size={38} round />
                </Box>
            ))}

            <CopyToClipboard text={url} onCopy={handleCopy}>
                <IconButton
                    aria-label="Copy URL"
                    icon={<FaRegCopy />}
                    size="md"
                    isRound
                    _hover={{ transform: "scale(1.1)" }}
                    transition="transform 0.2s"
                />
            </CopyToClipboard>
        </Flex>
    )
}

export default Share;