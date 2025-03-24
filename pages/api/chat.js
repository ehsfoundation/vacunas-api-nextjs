export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();
    
    if (data.choices && data.choices[0]?.message?.content) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Error en la respuesta de OpenAI' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al contactar con OpenAI' });
  }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { message } = req.body;
  
  console.log('Mensaje recibido:', message);  // Log para verificar el mensaje

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await response.json();

    console.log('Respuesta de OpenAI:', data);  // Log para verificar la respuesta de OpenAI
    
    if (data.choices && data.choices[0]?.message?.content) {
      res.status(200).json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Error en la respuesta de OpenAI' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al contactar con OpenAI' });
  }
}

