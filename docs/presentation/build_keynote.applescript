-- Build a native Keynote deck from rendered 16:9 slide images.
on pad2(n)
	if n < 10 then
		return "0" & n
	else
		return n as text
	end if
end pad2

on run
	set presentationDir to "/Users/shind/Projects/TanmayPortfolio/docs/presentation"
	set slidesDir to presentationDir & "/preview/"
	set outKey to presentationDir & "/TanmayPortfolio-Assignments-1-6.key"
	set outPptx to presentationDir & "/TanmayPortfolio-Assignments-1-6.pptx"
	set outPdf to presentationDir & "/TanmayPortfolio-Assignments-1-6.pdf"

	set notesList to {¬
		"Open with: this is one React Native portfolio that satisfies Assignments 1–6. Community CLI, android/ in Android Studio, Pixel_9 emulator.", ¬
		"Six assignments, one codebase. Then dive into A1 with the emulator story.", ¬
		"Show package.json react-native, then android/ in Studio, then this Home screenshot. Mention Metro Fast Refresh.", ¬
		"Native = best performance, two codebases. Hybrid = WebView. RN = React components that map to View/Text native widgets.", ¬
		"If asked why not native: would not teach Props/useState as directly. Why not hybrid: WebView is not View/Text.", ¬
		"Viva line 1: Data lives in src/data; components stay reusable via Props. Open Projects, tap Details.", ¬
		"Viva line 2: isDark in App.tsx updates the whole theme when Switch toggles. Empty Submit shows three errors.", ¬
		"A4 is A3 plus documentation. Point at the markdown tree, then Theme Switch + contact validation.", ¬
		"Walk Home: Image, Text, View, Switch, ScrollView, StyleSheet. Other widgets live on Contact.", ¬
		"Quick pan: Skills chips, Experience timeline, More menu, Contact form.", ¬
		"On Skills, point at wrapping chips. On Experience, point at the vertical rail plus row.", ¬
		"Live demo: More then Contact. Empty Submit shows errors. Valid Submit shows Alert.", ¬
		"Use this if they ask how this meets Excellent. Functionality first, then Concept Implementation.", ¬
		"Live demo script. Do not open the IDE until step 7. Two viva lines: data in src/data; isDark updates the theme.", ¬
		"Stop talking. Wait for questions. If silence, offer to open ContactForm.tsx or App.tsx."}

	tell application "Keynote"
		activate
		set theDoc to make new document with properties {document theme:theme "Black", width:1920, height:1080}
		tell theDoc
			set slide numbers showing to false
			set blankLayout to slide layout "Blank"

			repeat with i from 1 to 15
				set imgPath to slidesDir & "slide-" & my pad2(i) & ".png"
				if i is 1 then
					set thisSlide to slide 1
				else
					set thisSlide to make new slide at the end of slides
				end if
				tell thisSlide
					set base layout to blankLayout
					set title showing to false
					set body showing to false
					set presenter notes to item i of notesList
					set theImage to make new image with properties {file:POSIX file imgPath}
					set position of theImage to {0, 0}
					set width of theImage to 1920
					set height of theImage to 1080
				end tell
			end repeat
		end tell

		-- Replace any existing outputs
		do shell script "rm -rf " & quoted form of outKey & " " & quoted form of outPptx & " " & quoted form of outPdf

		save theDoc in POSIX file outKey
		delay 1
		export theDoc to POSIX file outPptx as Microsoft PowerPoint
		export theDoc to POSIX file outPdf as PDF
		delay 1
		close theDoc saving no
	end tell

	return outKey
end run
