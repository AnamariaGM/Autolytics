import React from "react";
import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Image,
} from "@chakra-ui/react";

import { FiBell, FiChevronDown, FiHome, FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../../Assets/Logo.png";
import carHeadlights from "../../Assets/car-headlights.jpg";
import { PiCarSimpleDuotone } from "react-icons/pi";
import { customerProfilePicture } from "../../services/client.js";

const LinkItems = [
  { name: "Home", route: "/dashboard", icon: FiHome },
  { name: "Cars", route: "/dashboard/customers", icon: PiCarSimpleDuotone },
];

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      position="relative"
      align="center"
      justify="flex-end"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${carHeadlights})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        filter: "brightness(0.5) sepia(0.7) hue-rotate(120deg) saturate(3)",
        zIndex: -1,
      }}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg="rgba(50, 50, 50, 0.8)">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg="rgba(255, 255, 255, 0.1)"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        flexDirection="column"
        alignItems="center"
        mx="8"
        mb={105}
        mt={2}
        justifyContent="space-between"
      >
        <Text color="white" fontSize="2xl" fontWeight="bold" mb={5}>
          Dashboard
        </Text>
        <Image
          src={Logo}
          borderRadius="full"
          boxSize="200px"
          alt="Logo"
          alignSelf="center"
          filter="brightness(0.7) sepia(1) hue-rotate(130deg) saturate(4)"
        />
        <CloseButton
          size="lg"
          color={"white"}
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          mb={4}
          bg="rgba(0, 0, 0, 0.5)"
          position="absolute"
          bottom="500"
          borderRadius="full"
          _hover={{
            bg: "rgba(0, 0, 0, 0.7)",
          }}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          color={"white"}
          key={link.name}
          route={link.route}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, route, children, ...rest }) => {
  return (
    <Link
      href={route}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "black",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const { logOut, customer } = useAuth();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="rgba(255, 255, 255, 0.1)"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        color={"white"}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          color="white"
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              color="white"
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={customerProfilePicture(customer?.id)}
                  alt={"Customer"}
                  css={{
                    border: "2px solid white",
                  }}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{customer?.username}</Text>
                  {customer &&
                    customer.roles &&
                    customer.roles.map((role, id) => (
                      <Text key={id} fontSize="xs" color="gray.600">
                        {role}
                      </Text>
                    ))}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
