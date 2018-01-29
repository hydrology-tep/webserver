using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Firefox;

namespace Terradue.TepHydro.WebTest{

    [TestFixture]
    public class SeleniumTestsFirefox : SeleniumTests {

        [TestFixtureSetUp]
        public void SetupTest() {
            driver = new FirefoxDriver();
            base.SetupTest(driver, "Firefox");
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
