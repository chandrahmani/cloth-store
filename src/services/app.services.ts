import axios from 'axios';

// create a get api method with axios
export const fetchUser = async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/hidaytrahman/hidaytrahman/main/me.json',
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

interface CreateTodoResult {
  data: unknown;
  error: string | null;
}

// create a post api method with axios
export const createTodo = async (
  title: string,
  completed: boolean = false,
): Promise<CreateTodoResult> => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed,
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

import { Product } from '../types/index';

export const getProducts = async (): Promise<Product[]> => {
  return [
    {
      id: 1,
      name: 'Red T-Shirt',
      price: 450,
      image:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR6C5t7PVz1wf19MEeyCr2naTSQO7s5VhOa0HBDQnPsqqJT3JrIiqwlASs17vHctaCsBZwh2OP63G2Vtdmo4gisMKHegkQ0Qf1hFDzX7haTLuhuBU9xES_RWqs',
      description: 'Soft cotton t-shirt',
    },
    {
      id: 2,
      name: 'Blue Jeans',
      price: 500,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrbTx7GNrW-VEYs2e0NJeeLnTy1Tp1X5jAYw&s',
      description: 'Slim fit denim',
    },
    {
      id: 2,
      name: 'Black denim',
      price: 800,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjPQ-5Ekr-nsqh6IQoUHQW4PwEMRRJJlOv0A&s',
      description: 'Slim fit denim',
    },
  ];
};
