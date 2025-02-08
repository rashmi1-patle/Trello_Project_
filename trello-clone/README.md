Trello Clone

This is a Trello-like board application built using Next.js and React, allowing users to manage tasks by adding, editing, deleting, and rearranging task cards within multiple lists.

🚀 Getting Started

1️⃣ Clone the Repository

git clone https://github.com/rashmi1-patle/Trello_Project_.git

2️⃣ Navigate to the Project Directory

cd Trello_Project_/trello-clone

3️⃣ Install Dependencies

npm install

4️⃣ Start the Development Server

npm run dev

After running this command, the project will be available at:

Local: http://localhost:3000

Network: Shown in the terminal

📦 Build for Production

To create a production build, run:

npm run build
npm start

🔧 Common Issues & Fixes

❌ Port 3000 is Already in Use

If you see an error like EADDRINUSE: address already in use :::3000, kill the process using:

npx kill-port 3000
npm start

Or manually stop it:

netstat -ano | findstr :3000  # Find the process ID (PID)
taskkill /PID <PID> /F        # Replace <PID> with the actual process ID

❌ Missing .next Folder

If you see an error like Could not find a production build in the '.next' directory, build the project first:

npm run build
npm start

❌ Modules Not Found

If you face dependency issues, delete and reinstall modules:

rm -rf node_modules package-lock.json
npm install

🎯 Features

✅ Drag-and-drop task management
✅ Add, edit, delete task cards
✅ Reorder tasks within lists
✅ Responsive UI built with Next.js & React
