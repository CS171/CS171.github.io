var facts = [
	"About 2,400 faculty members and more than 10,400 academic appointments in affiliated teaching hospitals",
	"Harvard is the oldest institution of higher education in the United States, established in 1636 by vote of the Great and General Court of the Massachusetts Bay Colony.",
	"Students: ~ 6,700 Harvard College and ~ 14,500 graduate and professional students",
	"More than 323,000 living alumni, over 271,000 in the U.S., nearly 52,000 in some 201 other countries.",
	"Honors: 47 Nobel Laureates, 32 heads of state, 48 Pulitzer Prize winners.",
	"Harvard Motto: Veritas (Latin for “truth”)",
	"Real Estate Holdings: 5,083 acres",
	"Library Collection: The Harvard Library—the largest academic library in the world—includes 18.9 million volumes, 174,000 serial titles, an estimated 400 million manuscript items, 10 million photographs, 56 million archived web pages, and 5.4 terabytes of born-digital archives and manuscripts. Access to this rich collection is provided by nearly 1,000 library staff members who operate more than 70 separate library units.",
	"Harvard University is made up of 11 principal academic units – ten faculties and the Radcliffe Institute for Advanced Study. The ten faculties oversee schools and divisions that offer courses and award academic degrees.",
	"Harvard College Tuition, Fees, Room, and Board: $14.100 in 1985 → $60.659 in 2016",
	"7.595 Degrees Awarded (University Total 2014-15)",
	"The University owns and operates more than six hundred buildings of varying sizes and characteristics, spread over a wide geographic area. They encompass approximately 26 million gross square feet of space.",
	"Every year, Harvard attracts approximately $1 billion in federal research funding to Massachusetts. A significant amount of that money is used to hire local workers and purchases supplies from local companies.",
	"Harvard is committed to enhancing affordable housing in its host communities. Since 2000, the University has supported the creation or renovation of more than 4,628 affordable housing units in Boston and Cambridge, allowing more than 662 families to become new homeowners.",
	"The number of international students at Harvard has grown by more than 62 percent since 1991.",
	"Founded in 1636, Harvard University is the oldest institution of higher education in North America.",
	"Harvard enrolls students from more than 125 countries and from every background.  In the last two decades, the number of international students at Harvard has grown by more than two-thirds, so that today more than 20% of Harvard students are from outside the United States.",
	"The teaching interests of Harvard faculty span the globe and Harvard students have the opportunity to learn in and about nearly every country in the world.  HarvardX offers online courses in subjects from law to history to public health and engineering to students around the world.",
	"Harvard College: Close to 60% of undergraduates receive Harvard Scholarship.",
	"Harvard College: Two-thirds of students work during the academic year.",
	"Harvard College: Ninety percent of American families would pay the same or less to send their children to Harvard as they would a state school.",
	"The Harvard Crimson: The size and shape of Harvard Stadium is the reason football today is the way it is. In 1906, President Theodore Roosevelt called for an intercollegiate conference to make football safer for students. One suggestion was to widen the field, which Harvard’s stadium could not accommodate due to the closeness of the stands to the field. Afraid that eliminating football at Harvard would spell doom for the sport on a national level, the forward pass was adopted instead.",
	"The Harvard Crimson: On May 6, 1875, Harvard students voted to select Crimson as the school nickname and color for all future athletic competitions.",
	"The Harvard Crimson: There’s a “Little Red Flag” waved each time the Harvard football team scores against Yale.",
	"The Harvard Crimson: In 1901, Miss Constance Applebee, an English student attending Harvard’s summer school, introduced Field Hockey to the United States.",
	"The Harvard Crimson: The Harvard baseball team defeated the Boston Red Sox in 1916, the same year the Sox won the World Series."
];



document.getElementById("cs171-basics").onclick = function(){
	var randomFact = facts[Math.floor(Math.random()*facts.length)];

	// CREATE NEW PARAGRAPH-TAG
	var paragraph = document.createElement("p");
	paragraph.className = "generated-content";

	// CREATE PARAGRAPH CONTENT
	var node = document.createTextNode(randomFact);

	// ADD PARAGRAPH CONTENT TO TAG
	paragraph.appendChild(node);

	// ADD PARAGRAPH TO DIV-CONTAINER WITH ID "content"
	var element = document.getElementById("content");
	element.appendChild(paragraph);
}