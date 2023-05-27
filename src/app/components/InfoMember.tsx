"use client";

import type { PropsWithChildren } from "react";
import NextLink from "next/link";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaInstagram, FaFacebook } from "react-icons/fa";

import { AvatarImage } from "@/app/components/Image";
import { Member } from "@/app/utils/types";

const PersonalInfo = ({
  id,
  label,
  color,
  membersData,
}: {
  id: string;
  label: string;
  color: string;
  membersData: Member[];
}) => {
  const member = membersData.find((member) => member.id === id);
  if (!member) return null;

  return (
    <Flex
      justify={{ base: "center", sm: "flex-start" }}
      align="center"
      fontSize="sm"
    >
      <Text color="gray.500">{label} /</Text>
      <Link
        as={NextLink}
        href={`/member/${member.id}`}
        ml={1.5}
        color={color}
        fontWeight={600}
        onClick={(e) => e.stopPropagation()}
      >
        @{id}
      </Link>
    </Flex>
  );
};

const Interest = ({ children }: PropsWithChildren) => {
  const color = useColorModeValue("gray.700", "gray.300");
  const colorHover = useColorModeValue("gray.800", "gray.200");
  const bgColorHover = useColorModeValue("gray.200", "gray.500");

  return (
    <Badge
      py={0.5}
      px={1.5}
      color={color}
      _hover={{
        color: colorHover,
        bgColor: bgColorHover,
      }}
    >
      {children}
    </Badge>
  );
};

const SocialButton = ({
  network,
  icon,
  link,
}: {
  network: "facebook" | "instagram";
  icon: IconType;
  link: string;
}) => (
  <IconButton
    as={Link}
    href={link}
    target="_blank"
    icon={<Icon as={icon} boxSize={5} />}
    size="lg"
    bgColor={`${network}.500`}
    color="white"
    rounded="full"
    aria-label={network}
    _hover={{
      bgColor: `${network}.400`,
    }}
  />
);

const Info = ({
  data,
  membersData,
}: {
  data: Member;
  membersData: Member[];
}) => {
  const nicknameColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Card
      borderTopWidth={4}
      borderStyle="solid"
      borderColor="secondary.600"
      borderRadius={16}
    >
      <CardBody>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between">
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "center", sm: "flex-start" }}
          >
            <Box boxSize={36} mr={{ base: 0, sm: 6 }}>
              <AvatarImage id={data.id} name={data.name} boxSize="full" />
            </Box>

            <Box
              textAlign={{ base: "center", sm: "left" }}
              mt={{ base: 3, sm: 0 }}
            >
              <Heading
                as="h2"
                mb={4}
                color={nicknameColor}
                fontSize="2xl"
                fontWeight={600}
              >
                @{data.id}
              </Heading>

              <List spacing={1}>
                {/* Current partner */}
                {data.current_partner && (
                  <ListItem>
                    <PersonalInfo
                      id={data.current_partner}
                      label="Partner/ka"
                      color={nicknameColor}
                      membersData={membersData}
                    />
                  </ListItem>
                )}

                {/* Ex partner */}
                {data.ex_partners && data.ex_partners.length > 0 && (
                  <>
                    {data.ex_partners.map((exPartner) => (
                      <ListItem key={exPartner}>
                        <PersonalInfo
                          id={exPartner}
                          label="Ex-partner/ka"
                          color={nicknameColor}
                          membersData={membersData}
                        />
                      </ListItem>
                    ))}
                  </>
                )}

                {/* Siblings */}
                {data.siblings && data.siblings.length > 0 && (
                  <>
                    {data.siblings.map((sibling) => (
                      <ListItem key={sibling}>
                        <PersonalInfo
                          id={sibling}
                          label="Sourozenec"
                          color={nicknameColor}
                          membersData={membersData}
                        />
                      </ListItem>
                    ))}
                  </>
                )}
              </List>

              <Flex
                gap={1}
                mt={5}
                justify={{ base: "center", sm: "flex-start" }}
              >
                {data.interest.map((interest) => (
                  <Interest key={interest}>{interest}</Interest>
                ))}
              </Flex>
            </Box>
          </Flex>

          {/* Social networks */}
          <Flex
            gap={2}
            justify={{ base: "center", sm: "flex-start" }}
            mt={{ base: 6, md: 0 }}
          >
            {data.facebook && (
              <SocialButton
                network="facebook"
                icon={FaFacebook}
                link={`https://www.facebook.com/${data.facebook}`}
              />
            )}
            {data.instagram && (
              <SocialButton
                network="instagram"
                icon={FaInstagram}
                link={`https://www.instagram.com/${data.instagram}`}
              />
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Info;
