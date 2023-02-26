import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Checkbox, Heading, VStack, AccordionIcon, Button, Icon, Divider, IconButton, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, FunctionComponent, MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { createStore, set, get, clear } from "idb-keyval";
import template from "../data/template.json";
import { formatValue } from "../utils";
import { AddIcon, DeleteIcon, ResetIcon } from "./Icons";

interface PackingListProps {}

type PackingList = PackingListCategory[];

interface PackingListCategory {
  id: string;
  name: string;
  items: PackingListItem[];
}

interface PackingListItem {
  label: string;
  value: string;
  checked: boolean;
}

const PackingList: FunctionComponent<PackingListProps> = () => {
  const [packingList, setPackingList] = useState<PackingList>(template);
  const [newItems, setNewItems] = useState<Record<string, string>>({
    documents: "",
    finances: "",
    clothes: "",
    medical: "",
    travelAids: "",
    appliances: "",
    toiletries: "",
    misc: "",
  });

  const customStore = createStore("packbags-travel", "packing-list");

  useEffect(() => {
    get("packing-list", customStore).then((state) => {
      if (state !== undefined) {
        setPackingList(state);
      }
    });
  }, []);

  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setPackingList((prevList) => {
      const newList = prevList.map((category) => ({
        ...category,
        items: category.items.map((item) => (item.value === value ? { ...item, checked: !item.checked } : item)),
      }));
      set("packing-list", newList, customStore);
      return newList;
    });
  };

  const handleDelete = (value: string) => {
    setPackingList((prevList) => {
      const newList = prevList.map((category) => ({
        ...category,
        items: category.items.filter((item) => item.value !== value),
      }));
      set("packing-list", newList, customStore);
      return newList;
    });
  };

  const handleInputChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setNewItems({ ...newItems, [name]: value });
  };

  const handleAdd = (category: string) => {
    setPackingList((prevList) => {
      const newList = prevList.map((item) =>
        item.id === category
          ? {
              ...item,
              items: item.items.concat({
                label: newItems[category],
                value: formatValue(newItems[category]),
                checked: false,
              }),
            }
          : item
      );
      set("packing-list", newList, customStore);
      setNewItems({ ...newItems, [category]: "" });
      return newList;
    });
  };

  const handleClear = () => {
    clear(customStore);
    setPackingList(template);
  };

  return (
    <Accordion shadow="md" py={4} rounded="md" bg="white" defaultIndex={[0]} allowMultiple>
      {packingList.map(({ id, name, items }) => (
        <AccordionItem key={id}>
          <Heading as="h4" noOfLines={1}>
            <AccordionButton>
              <Box as="span" color="cyan.600" fontSize="lg" fontFamily="heading" flex="1" textAlign="left">
                {name}
              </Box>
              <AccordionIcon color="yellow.500" />
            </AccordionButton>
          </Heading>
          <AccordionPanel>
            <VStack align="stretch">
              {items.map(({ label, value, checked }) => (
                <Flex>
                  <Checkbox colorScheme="cyan" textDecoration={checked ? "line-through" : "initial"} key={value} value={value} isChecked={checked} onChange={handleChange}>
                    {label}
                  </Checkbox>
                  <IconButton aria-label="Delete item" icon={<DeleteIcon />} variant="link" ml="auto" justifyContent="flex-end" pr="2px" onClick={() => handleDelete(value)} />
                </Flex>
              ))}
              <Flex pt={2}>
                <Input size="sm" mr={4} placeholder="New item" name={id} value={newItems[id]} onChange={handleInputChange} />
                <Button leftIcon={<AddIcon />} iconSpacing="1" size="sm" mr={1} px={6} colorScheme="teal" onClick={() => handleAdd(id)}>
                  Add item
                </Button>
              </Flex>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      ))}
      <Divider />
      <Box mt={6} textAlign="center">
        <Button leftIcon={<ResetIcon />} iconSpacing="1" colorScheme="orange" variant="ghost" onClick={handleClear}>
          Reset
        </Button>
      </Box>
    </Accordion>
  );
};

export default PackingList;
