export const handleSubmit = async (
  reason: string,
  selectedDate: 'today' | 'tomorrow',
  onClose: () => void
) => {
  if (!reason.trim()) {
    alert('Пожалуйста, введите причину.');
    return;
  }

  if (!selectedDate) {
    alert('Пожалуйста, выберите дату.');
    return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Access-Control-Allow-Origin", "*/*");
  myHeaders.append("Accept", "*/*");

  const sourceUsername = null; // или undefined, или ''
  const username = sourceUsername || 'ikustow';


  const messageData = {
    reason: reason,
    username: username,
    selectedDate: selectedDate,
    status: "new",
  };

  const raw = JSON.stringify(messageData);

  try {
    console.log(JSON.stringify(messageData));
    const response = await fetch(
      'https://us-central1-ff-vacation-manager-g8xdvb.cloudfunctions.net/pubsub-submit',
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }
    );

    if (response.ok) {
      alert('Successfully sent.');
    } else {
      alert('Error sending request');
    }
  } catch (error) {
    console.error('Error sending request:', error);
    alert('Error sending request');
  }

  onClose();
};
