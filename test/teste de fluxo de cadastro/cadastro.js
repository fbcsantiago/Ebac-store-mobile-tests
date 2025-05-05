const { remote } = require('webdriverio');

const capabilities = {
    platformName: 'Android',
    appium: {
        automationName: 'UiAutomator2',
        app: 'storage:filename=ebacshop.aab', 
        deviceName: 'ebac_Qe',
        platformVersion: '11.0',
        autoGrantPermissions: true,
    }
};

(async () => {
    const driver = await remote({
        user: 'oauth-fernanda.carvalho1985-1b72d',
        key: '9bb399b4-8093-47ad-b5fc-3f2ec9910304',
        hostname: 'ondemand.us-west-1.saucelabs.com',
        port: 443,
        path: '/wd/hub',
        capabilities
    });

    try {
       
        await driver.pause(5000);

       
        const ebacStoreText = await driver.$('//android.widget.TextView[@text="EBAC Store"]');
        if (!await ebacStoreText.isDisplayed()) throw new Error('EBAC Store não visível');

        
        await (await driver.$('id=firstName')).setValue('João');
        await (await driver.$('id=lastName')).setValue('Silva');

        await (await driver.$('//android.widget.EditText[@text="Phone Number"]')).setValue('11999999999');
        await (await driver.$('//android.widget.EditText[@text="Email Address"]')).setValue('joao@email.com');

        await (await driver.$('id=password')).setValue('Senha1234');
        await (await driver.$('id=repassword')).setValue('Senha1234');

        
        await (await driver.$('id=Create')).click();

        
        await driver.pause(3000);

        
        const successMsg = await driver.$('//android.widget.TextView[contains(@text, "sucesso")]');
        if (!await successMsg.isDisplayed()) throw new Error('Mensagem de sucesso não encontrada');

        await driver.execute('sauce:job-result=passed');
    } catch (error) {
        console.error('Erro durante o teste:', error.message);
        await driver.execute('sauce:job-result=failed');
    } finally {
        await driver.deleteSession();
    }
})();
