import { readFile } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to parse SQL INSERT statements and convert to JSON
function parseSqlToJson(filePath) {
    readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Regular expression to match the SQL INSERT values
        const regex = /INSERT INTO `Post`\(`id`,`createdAt`,`authorId`,`content`,`parentId`\) VALUES\n((?:\("[^"]+","[^"]+","[^"]+","[^"]+",(NULL|"[^"]*")\),\n?)+)/g;
        const matches = data.match(regex);

        // Check if there are any matches
        if (!matches) {
            console.log('No INSERT statements found.');
            return;
        }

        const valuesRegex = /\("([^"]+)","([^"]+)","([^"]+)","([^"]+)",(NULL|"[^"]*")\)/g;
        let match;
        const posts = [];

        // Process each INSERT statement
        matches.forEach((insert) => {
            while ((match = valuesRegex.exec(insert)) !== null) {
                posts.push({
                    id: match[1],
                    createdAt: `new Date("${match[2]}")`, // Convert to JavaScript Date
                    authorId: match[3],
                    content: match[4].replace(/\\'/g, "'"), // Unescape single quotes
                    parentId: match[5] === 'NULL' ? null : match[5].replace(/"/g, ''), // Handle NULL or unquote
                });
            }
        });

        console.log('const posts = [');
        posts.forEach((post) => {
            console.log(`  ${JSON.stringify(post, null, 2)},`);
        });
        console.log('];');
    });
}

// Path to the SQL dump file
const filePath = join(__dirname, 'chirpdb.Post.00001.sql'); // Replace 'dump.sql' with your actual file name if different
parseSqlToJson(filePath);
