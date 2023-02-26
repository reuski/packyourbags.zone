import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Checkbox, Heading, VStack, AccordionIcon, Button, Icon, Divider, IconButton, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, FunctionComponent, MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { createStore, set, get, clear } from "idb-keyval";
import template from "../data/template.json";
import { formatValue } from "../utils";

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

  const ResetIcon = (): ReactElement => (
    <Icon viewBox="0 0 24 24">
      <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </Icon>
  );

  const DeleteIcon = (): ReactElement => (
    <Icon viewBox="0 0 20 20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </Icon>
  );

  const AddIcon = (): ReactElement => (
    <Icon viewBox="0 0 20 20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
      </svg>
    </Icon>
  );

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
