// Inicialización de variables
let mood = 'neutral';
let currentTopic = ''; // Guardar el tema actual
let communityAdvice = [];  // Para almacenar consejos de la comunidad

let respuestas = {
    amor: [
        "El amor verdadero no duele, acompaña. Siempre está presente cuando menos lo esperas, y a veces, cuando te sientes más solo, es cuando más lo encuentras. Recuerda que el amor empieza contigo mismo.",
        "Amar también es aprender a soltar. No se trata de aferrarse, sino de dar espacio para que la otra persona crezca. La verdadera libertad está en saber cuándo dejar ir, sin miedo.",
        "El amor empieza por vos mismo. Si no te amas, es difícil que puedas ofrecer amor genuino a los demás. Cuídate, respétate y date el valor que mereces, porque eres único y especial."
    ],
    autoestima: [
        "Confía en ti mismo. Recuerda que todo lo que necesitas está dentro de ti. No permitas que las dudas te frenen, porque tu potencial es ilimitado. Eres capaz de lograr lo que te propongas.",
        "Cree en tu potencial. Cada paso que das es una oportunidad para crecer y aprender. Las caídas no definen tu valor, lo que defines es cómo te levantas.",
        "Valórate siempre. La autoestima no se trata de ser perfecto, sino de reconocer que eres suficiente tal como eres. Nadie puede quitarte el valor que tienes."
    ],
    frases: [
        "Cada día es una nueva oportunidad. A veces, lo único que necesitamos es un nuevo amanecer para empezar de nuevo. Aprovecha cada instante, porque el presente es lo único que realmente tenemos.",
        "La vida es 10% lo que te pasa y 90% cómo reaccionas. Las dificultades son inevitables, pero cómo las enfrentas es lo que determina tu éxito. La actitud lo es todo.",
        "Tú eres el único responsable de tu felicidad. No pongas tu bienestar en manos de nadie más. La felicidad se construye desde adentro, no desde lo externo."
    ],
    miloJ: [
        "Milo J. siempre dice: 'Nunca te rindas, la vida siempre tiene algo bueno para ofrecerte. Todo desafío es una lección que te ayudará a crecer.'",
        "Cuando te sientas triste, recuerda que Milo J. dice: 'La tristeza es solo una fase, pronto vendrán momentos felices. Todo tiene su tiempo, y después de la lluvia siempre sale el sol.'",
        "Milo J. también cree que 'Las emociones son parte de lo que somos, y cada día es una nueva oportunidad para ser mejor. No te detengas por los obstáculos, cada día es una nueva oportunidad para empezar de nuevo.'"
    ],
    supervivencia: [
        "Las palabras clave para sobrevivir dependen del contexto, pero generalmente incluyen términos básicos de ayuda como 'refugio', 'fuego', 'agua', 'comida', 'primeros auxilios', 'mapa', y 'brújula'.",
        "En un contexto de superación personal, las palabras clave son 'resiliencia', 'perseverancia', 'resistencia', 'fuerza', 'esperanza', y 'optimismo'. Esas son las claves para superar cualquier adversidad.",
        "Cuando estás en una situación de supervivencia práctica, tener a tu disposición lo esencial es crucial: un refugio, agua potable, comida y herramientas como una brújula, un mapa o un cuchillo."
    ],
    emergencia: [
        "Si estás en una situación de emergencia, la primera palabra que debes recordar es 'Ayuda'. Decir '¡Necesito ayuda!' es lo primero que debes hacer si estás en peligro o herido.",
        "Si te pierdes en un viaje, una de las primeras preguntas que puedes hacer es: '¿Dónde está el baño?', '¿Dónde estoy?' o '¿Cuánto cuesta?' si necesitas comprar algo de urgencia.",
        "En caso de no entender a la otra persona, siempre puedes decir 'No entiendo', y pedir ayuda o traducción."
    ]
};

// Función para manejar el chat
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    let chatBox = document.getElementById("chatBox");

    // Mostrar el mensaje del usuario
    let userMessage = createMessage(userInput, 'user');
    chatBox.appendChild(userMessage);

    // Limpiar el campo de texto
    document.getElementById("userInput").value = '';

    // Mostrar "Escribiendo..."
    let typingMessage = createMessage("Escribiendo...", 'bot');
    chatBox.appendChild(typingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simular un retraso para mostrar la respuesta
    setTimeout(function() {
        // Eliminar "Escribiendo..." y mostrar la respuesta real
        chatBox.removeChild(typingMessage);

        // Obtener la respuesta del bot
        let botResponse = getBotResponse(userInput);
        let botMessage = createMessage(botResponse, 'bot');
        chatBox.appendChild(botMessage);

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1500);  // Retraso de 1.5 segundos
}

// Función para crear un mensaje
function createMessage(messageText, sender) {
    let message = document.createElement('div');
    message.classList.add('message', sender);
    message.textContent = messageText;
    return message;
}

// Función para obtener una respuesta del bot
function getBotResponse(userInput) {
    let input = userInput.toLowerCase();
    let response = '';

    // Detectar palabras clave como "amor", "autoestima", "milo", "frases", "supervivencia"
    if (input.includes('amor')) {
        currentTopic = 'amor';
        response = getRandomResponse(respuestas.amor);
    } else if (input.includes('autoestima')) {
        currentTopic = 'autoestima';
        response = getRandomResponse(respuestas.autoestima);
    } else if (input.includes('frases')) {
        currentTopic = 'frases';
        response = getRandomResponse(respuestas.frases);
    } else if (input.includes('milo') || input.includes('milo j')) {
        currentTopic = 'miloJ';
        response = getRandomResponse(respuestas.miloJ);
    } else if (input.includes('supervivencia')) {
        currentTopic = 'supervivencia';
        response = getRandomResponse(respuestas.supervivencia);
    } else if (input.includes('emergencia')) {
        currentTopic = 'emergencia';
        response = getRandomResponse(respuestas.emergencia);
    } else if (input.includes('consejo')) {
        response = "Aquí tienes un consejo útil: " + getRandomResponse(respuestas.supervivencia);
    } else {
        response = "Lo siento, no tengo mucha información sobre eso. Pero, ¿quieres hablar sobre amor, autoestima, frases o supervivencia? 🙏";
    }

    // Preguntar qué más quiere saber después de dar una respuesta
    response += " ¿Qué más te gustaría saber?";

    return response;
}

// Función para obtener una respuesta aleatoria de un array
function getRandomResponse(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Cambiar estado de ánimo
function setMood(moodValue) {
    mood = moodValue;
    let chatBox = document.getElementById("chatBox");
    let moodMessage = '';

    if (mood === 'feliz') {
        moodMessage = '¡Me alegra mucho saber que estás feliz! 😊';
    } else if (mood === 'triste') {
        moodMessage = 'Lamento escuchar que estás triste. Recuerda que todo pasa y siempre hay un mañana mejor. 💜';
    } else if (mood === 'neutral') {
        moodMessage = 'Parece que estás en un estado equilibrado. ¡Perfecto!';
    } else if (mood === 'normal') {
        moodMessage = 'Todo está bien, solo sigue adelante. 🤖';
    }

    if (moodMessage !== '') {
        let moodUpdate = createMessage(moodMessage, 'bot');
        chatBox.appendChild(moodUpdate);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Función para agregar un consejo a la comunidad
function addAdvice() {
    let adviceInput = document.getElementById("newAdvice").value;
    if (adviceInput.trim() !== "") {
        communityAdvice.push(adviceInput);
        document.getElementById("newAdvice").value = "";  // Limpiar campo de texto
        updateCommunityAdvice();
    }
}

// Función para mostrar los consejos de la comunidad
function updateCommunityAdvice() {
    let communityList = document.getElementById("communityList");
    communityList.innerHTML = ''; // Limpiar lista de consejos
    communityAdvice.forEach(function(advice) {
        let adviceItem = document.createElement("div");
        adviceItem.classList.add("adviceItem");
        adviceItem.textContent = advice;
        communityList.appendChild(adviceItem);
    });
}
