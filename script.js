document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-button');
    const walletInput = document.getElementById('wallet-address');
    const inputSection = document.querySelector('.input-section');
    const loserPopup = document.getElementById('loser-popup');
    const goBackButton = document.getElementById('go-back-button');
    const loadingModal = document.getElementById('loading-modal');
    const loadingBar = document.getElementById('loading-bar');
    // const trickPopup = document.getElementById('trick-popup'); /* Удаляем ссылку на старый поп-ап */
    const errorMessage = document.getElementById('error-message'); /* Новое сообщение об ошибке */

    // Функция для валидации адреса кошелька
    function validateWalletAddress(address) {
        // Простая проверка: адрес должен быть не пустым и иметь определенную минимальную длину.
        // Например, для Bitcoin-подобных адресов это около 26-35 символов.
        // Мы также проверяем отсутствие пробелов.
        return address.trim().length >= 26 && !address.includes(' ');
    }

    // Обработчик события ввода для поля адреса кошелька
    walletInput.addEventListener('input', () => {
        if (validateWalletAddress(walletInput.value)) {
            submitButton.disabled = false;
            errorMessage.style.display = 'none'; // Скрываем сообщение об ошибке, если ввод стал валидным
            submitButton.classList.remove('shake-animation'); // Удаляем анимацию
        } else {
            submitButton.disabled = true;
            errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
        }
    });

    // Устанавливаем начальное состояние кнопки при загрузке страницы
    submitButton.disabled = !validateWalletAddress(walletInput.value);

    submitButton.addEventListener('click', () => {
        // Проверяем валидность еще раз на случай, если кнопка была активирована вручную или были изменения после ввода
        if (!validateWalletAddress(walletInput.value)) {
            errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
            submitButton.classList.add('shake-animation'); // Добавляем анимацию тряски
            walletInput.value = ''; // Очищаем поле ввода
            submitButton.disabled = true; // Деактивируем кнопку

            // Через короткое время скрываем сообщение и убираем анимацию
            setTimeout(() => {
                errorMessage.style.display = 'none';
                submitButton.classList.remove('shake-animation');
            }, 1500); // Показываем на 1.5 секунды
            return; // Прерываем дальнейшее выполнение
        }

        // Если валидация прошла, продолжаем обычный процесс
        inputSection.style.display = 'none';
        loadingModal.style.display = 'block';
        loadingBar.style.width = '0%'; // Сбрасываем полоску загрузки

        // Запускаем анимацию загрузки и показываем поздравление через 3 секунды
        setTimeout(() => {
            loadingModal.style.display = 'none';
            loserPopup.style.display = 'block';
        }, 3000); // 3 секунды для загрузки
    });

    goBackButton.addEventListener('click', () => {
        loserPopup.style.display = 'none';
        inputSection.style.display = 'flex'; // Restore input section
        walletInput.value = ''; // Clear input field
    });
});
