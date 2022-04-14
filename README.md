# Cocktail Mixer
This repository contains the frontend and backend code for my cocktail mixer. The frontend was made with React and the backend was created with Node and Express. I hosted my site in my local network on a Raspberry Pi OS, which is built on top of Debian and is the default OS for the Raspberry Pi (single-board computer). This way, everyone is able to make a drink with the machine, if he is logged into my home wireless LAN. The created drinks, available ingredients etc. is saved in an SQLite3 database.

## Table of Contents
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
	- [Frontend](#frontend)
	- [Backend](#backend)
- [Build a physical Cocktail Mixer](#hammer-build-a-physical-cocktail-mixer)
- [Technology stack](#blue_book-technology-stack)
	- [Frontend](#frontend-stack)
	- [Backend](#backend-stack)
- [License](#scroll-license)

## :grey_exclamation: Usage
<p align="center">
	<img alt="homepage of frontend with numbers assigned to the sections" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/homepage.jpg?raw=true" />
</p>
<ol>
	<li>
		If the backend is reachable, it will state 'Connected' and the circle will be green, otherwise it will state 'Disconnected' and the circle will be red.
	</li>
	<li>
		Current status of the mixer, this will state 'Mixing', if a cocktail is being made, otherwise states 'Idle'.
	</li>
	<li>
		<details>
			<summary>
				This will open up the settings. You will be prompted for a password. The default password is <code>cocktail</code>.
			</summary>
			<div>
				<ol>
					<p align="center">
						<img alt="two images: static settings site with numbers on the left and animated settings site with action on the right" src="https://raw.githubusercontent.com/martenmatrix/cocktail-mixer/main/readme-images/static-and-animation-settings.gif" />
					</p>
					<li>
						In this section, you can set to which drink the pump is currently connected. The drinks are being categorized, so you can find them easier.
					</li>
					<li>
						Remove a drink completely, this is irreversible.
					</li>
					<li>
						Remove an ingredient, the ingredients are sorted by category, and the action is irreversible.
					</li>
					<li>
						Add an ingredient and assign it a category. The current categories consist of <code>juice</code>, <code>softdrink</code>, <code>alcohol</code> and <code>unableToPump</code>.
					</li>
					<li>
						This shows debugging information. It returns the current status of the machine, the current assigned ingredients to the pumps, and the ingredients available by category in JSON.
					</li>
				</ol>
			</div>
		</details>
	</li>
	<li>
		<details>
			<summary>
				This lists all the drinks available, automatically divided up into two sections: alcoholic and non-alcoholic. Click a drink to get an overview or to make it.
			</summary>
			<div>
				<p align="center">
					<img alt="section which pop ups after clicking on a drink" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/make-drink.jpg?raw=true" />
				</p>
				<ol>
					<li>
						This is the name of the drink you clicked.
					</li>
					<li>
						These are the ingredients and their amount included in your drink.
					</li>
					<li>
						After pressing this button, the machine will start to mix your drink. Don't forget to put a cup under it.
					</li>
					<li>
						Close the pop-up.
					</li>
				</ol>
			</div>
		</details>
	</li>
	<li>
		<details>
			<summary>
				This button allows you to add a drink.
			</summary>
			<div>
				<p align="center">
					<img alt="page which shows up after clicking a drink" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/add-drink.jpg?raw=true" />
				</p>
				<ol>
					<li>
						Give your drink a title. Multiple drinks can have the exact same name.
					</li>
					<li>
						This is the section for one ingredient of your new drink.
						<ol>
							<li>
								Select an ingredient, those are sorted by categories.
							</li>
							<li>
								Enter a number for your amount, e.g. if you want to add 500ml, just enter the number 500 here.
							</li>
							<li>
								Select a unit for your ingredient. Available units are ml, cl, tsp and tbsp. If your unit is not listed here, just transform it to milliliter, that's also what the program does.
							</li>
							<li>
								Delete the ingredient.
							</li>
						</ol>
					</li>
					<li>
						Here, you can create another ingredient section to add another ingredient.
					</li>
					<li>
						Submit your drink. Refresh the page, and it will now pop up in the list of available drinks.
					</li>
					<li>
						Abort the creation of a drink. The data, which was entered, will be deleted.
					</li>
				</ol>
			</div>
		</details>
	</li>
	<li>
		<details>
			<summary>
				This button allows you to individually activate specific pumps.
			</summary>
			<div>
				<p align="center">
					<img alt="section which pops up after pressing the button" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/all-pumps.jpg?raw=true" />
				</p>
				<ol>
					<li>
						The pumps are in order from top, to bottom. Their current connected ingredient is being shown on the button. Click a button and hold, the corresponding pump will start and will stop pumping when you release the button.
					</li>
					<li>
						Close the pop-up.
					</li>
				</ol>
			</div>
		</details>
	</li>
</ol>

## :sparkles: Features
- automatically detects origin of CSV
- calculate conversion fees in specific timeframe
- calculate realized incomes and losses with the first-in first-out method in specific timeframe

## :wrench: Installation

> :warning: The following guide is for Linux distributions.
1. Clone the repository:
	`https://github.com/martenmatrix/cocktail-mixer`
2. Navigate into the folder:
	`cd cocktail-mixer`
### Frontend
##### Development
Navigate into the folder called "frontend" and install all the requirements with `npm install`. If you want to get a live-preview of the site, run `npm start`.

##### Production
Navigate into the "frontend" folder and run `npm run build`. A folder called "build" will get created.

We are going to host the frontend with nginx on your local network.

1. Install nginx.
	`sudo apt-get update`
	`sudo apt-get install nginx`

2. Delete the content in the folder located at `/var/www/html` and move the content of the "build" folder, which we generated above, to the "html" folder.
3. Restart nginx with `sudo systemctl restart nginx`.
4. The site will be hosted on the machine's local network IP. You can get that IP with the command `hostname --all-ip-addresses`.

Make sure that the device with, which you want to access the website is in the same network as the computer, which hosts the site.

### Backend
##### Development
Run `npm install` in the top level directory, and you are ready to develop!
##### Production
Before building the backend, it is recommended to change the following environment variables:
- `SETTINGS_PASSWORD` The password to access the settings.
- `RATE_PUMP_[1-6]` The amount of liquid in milliliter the pump is able to pump per second.
> :warning: Changing the variables `BACKEND_PORT` and `FRONTEND_PORT` is currently not being supported.

If you want to connect the pumps to different GPIO pins than the [default assigned pins](), open up the `raspberry.js` file located in the backend folder and change the numbers in the `relays` array.

Build the backend with `npm run build`. A folder with the name "buildBackend" should get created. Go into the new created folder, open the .env file and set the `NODE_ENV` environment variable to `production`.

If you simply want to run the backend `cd` into the path with the "backend" folder located in the "buildBackend" folder, install the dependencies and run the app.js file with Node.
`cd /path-to-top-folder/buildBackend/backend`
`npm install`
`node app.js`

If you want that the backend is automatically started, after the computer boots, you'll have to set up a Cron job on Linux.
1. Open up the crontab file with:
	`crontab -e`
2. Add the following line to create your cron job. Make sure you replace "PATH" with the path to the "backend" folder, which is in the repository, which you've cloned in the "buildBackend" folder.
	`@reboot cd PATH; node app.js`
3. Save and exit.
4. This will `cd` into the backend folder and run the file app.js with Node on every system boot.

> :bulb: There are also the commands `uploadBackend` and `uploadFrontend`, which upload the files over SSH with rsync to a specified directory. Before using them, you'll have to edit them for your needs in the `package.json` file.

It is assumed that the pumps are connected to the following GPIO pins, if you want to connect a pump to another GPIO pin, take a closer look at the [production section](#production).
- Pump 1: 11
- Pump 2: 13
- Pump 3: 19
- Pump 4: 17
- Pump 5: 27
- Pump 6: 22
- Pump 7: 10
- Pump 8: 9

An issue can opened [here](https://github.com/martenmatrix/cocktail-mixer/issues/new).

## :hammer: Build a physical Cocktail Mixer
This is an explanation, how it is possible to build a Cocktail Mixer. However, please note, that this is definitely not a detailed and complete guide.

### Parts
You will need these parts to build the machine.

- 1 Raspberry Pi Model B Plus Rev 1.2
- 1 Funnel
- [8 Water Pumps](https://de.aliexpress.com/item/1005002863109224.html)
- [1 Power Supply](https://de.aliexpress.com/item/33042313383.html)
- [1 DC-DC Converter](https://www.amazon.de/gp/product/B07F38DJLS) (the Raspberry Pi needs 5V)
- Silicon wires
- Food Grade Pipes
- Power Cord

The pipes, which are connected to the pumps, all go into the funnel to mix the ingredients.
The pump's circuit will flow when the relay assigned to the pump gets activated. 
The backend and frontend is hosted on the Raspberry Pi and its GPIO Pins are connected to the relay.
The DC-DC converter is needed to power the Raspberry Pi with the Power Supply, otherwise the Pi would break because the Power Supply outputs a high voltage to power the pumps.

<details>
	<summary>
		Images of the built machine
	</summary>
	<div>
		<details>
			<summary>
				Front
			</summary>
			<div>
				<p align="center">
					<img alt="Front of the built machine" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/front-machine.jpg?raw=true" />
				</p>
			</div>
		</details>
		<details>
			<summary>
				Back
			</summary>
			<div>
				<p align="center">
					<img alt="Back of the built machine" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/back-machine.jpg?raw=true" />
				</p>
			</div>
		</details>
		<details>
			<summary>
				Inside
			</summary>
			<div>
				<p align="center">
					<img alt="Inside of the built machine from bottom" src="https://github.com/martenmatrix/cocktail-mixer/blob/main/readme-images/funnel-machine.jpg?raw=true" />
				</p>
			</div>
		</details>
	</div>
</details>


## :blue_book: Technology Stack

#### Frontend Stack
- **Create React App** v4.0.3

#### Backend Stack
- **Express** v.4.17.1
	- **cors** v2.8.5
	- **body-parser** v1.19.0
- **dotenv** v10.0.0
- **node-ip** v1.1.5
- **onoff** v6.0.3
- **node-sqlite3** v5.0.2

## :scroll: License
[MIT](https://github.com/martenmatrix/cocktail-mixer/blob/main/LICENSE)
