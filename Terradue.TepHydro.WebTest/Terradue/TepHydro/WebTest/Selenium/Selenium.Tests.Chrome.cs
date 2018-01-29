using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;

namespace Terradue.TepHydro.WebTest{

    /*
     * How to install Chromedriver
     * ---------------------------
     * 1/ Download the last version of ChromeDriver (e.g: http://chromedriver.storage.googleapis.com/2.17/chromedriver_mac32.zip)
     * 2/ Unzip and copy the file in /usr/bin/chromedriver.exe
    */

    [TestFixture]
    public class SeleniumTestChrome : SeleniumTests {
        
        [TestFixtureSetUp]
        public void SetupTest() {
            driver = new ChromeDriver("/usr/bin");
            base.SetupTest(driver, "Chrome");
        }

        [Test]
        public new void HomePageTest(){
            base.HomePageTest();
        }

        [Test]
        public new void PartnersPageTest(){
            base.PartnersPageTest();
        }
    }
}
