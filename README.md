# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


Apartment marketplace application				
Description					
It's a simple web based application for managing renting apartments marketplace. The main idea is making a simple admin panel for the marketplace with a list of available apartments and minimal functionality around it. Users have the ability to sort and filter apartments, create new ads and remove existing.

		 	 	 							
FrontEnd Part
TECHNOLOGIES:			
● React.js
● LocalStorage					
TASK				
Create a single page app for apartment marketplace. App user should be able to: 
● View list of available apartments;
● Sort by price and filter by rooms;
● Add new apartment;				
● Delete an apartment;
						
Apartment model: 
- id: string
- rooms: number
- name: string
- price: number
- description: string
						
DESCRIPTION:					
1.As a user, I should see the page which contains a list of available apartments and a form for adding new apartments. Available apartments list contains the list of apartments with the following fields:
		
●  Apartment name		
●  Number of rooms		
●  Price		
●  Description
 								
Each element of the list should have a delete button. If I click this button, the apartment is removed from the list. Also, I should see the number of total available apartments.
 								
2. Above the apartments list, I should see a Sort by a dropdown with the options following:			
●  Price - lowest to highest		
●  Price - highest to lowest
 								
When I select sorting mode, apartments are sorted by price accordingly.
 								
3. Above the apartments list, I should see a rooms filter field (Text input or dropdown). When I enter/select the number of rooms, apartments are filtered by the number of rooms. 					
![image](https://github.com/ruslan-moiseyenko/test-task-rental/assets/50419466/84030505-302d-4078-ad4b-0fd6d1edcfe1)
