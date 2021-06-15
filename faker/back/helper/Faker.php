<?php

namespace Helper;

class Faker
{
	static private $instance = null;

	static private $origin = "pt-br";

	static private $person = [];
	static private $text = [];

	static private $origins = [];
	static private $genders = [];
	static private $names = [
		"male" => [],
		"female" => [],
	];
	static private $surnames = [];
	static private $jobs = [];

	static private $zipCodes = [];
	static private $countries = [];
	static private $states = [];
	static private $cities = [];
	static private $addresses = [];

	static private $texts = [];
	static private $title = [];
	static private $description = [];
	static private $content = [];
	static private $body = [];
	static private $post = [];
	static private $comment = [];
	static private $paragraph = [];

	public static function getInstance()
	{
		if (is_null(self::$instance)) {
			self::$origins = json_decode(file_get_contents("./helper/faker/origin.json"), true);
			self::setOrigin();

			self::$genders = json_decode(file_get_contents("./helper/faker/gender.json"), true);
			self::$names["male"] = json_decode(file_get_contents("./helper/faker/male-name.json"), true)[self::$origin];
			self::$names["female"] = json_decode(file_get_contents("./helper/faker/female-name.json"), true)[self::$origin];
			self::$surnames = json_decode(file_get_contents("./helper/faker/surname.json"), true)[self::$origin];

			// self::$zipCode = json_decode(file_get_contents("./helper/faker/zip_code.json"), true);
			// self::$country = json_decode(file_get_contents("./helper/faker/country.json"), true);
			// self::$state = json_decode(file_get_contents("./helper/faker/state.json"), true);
			// self::$city = json_decode(file_get_contents("./helper/faker/city.json"), true);
			// self::$address = json_decode(file_get_contents("./helper/faker/address.json"), true);

			// self::$text = json_decode(file_get_contents("./helper/faker/text.json"), true);

			self::$instance = (new self);
		}

		return self::$instance;
	}

	public static function setOrigin($origin = "pt-br")
	{
		if (!is_null($origin))
			return self::$person["origin"] = $origin;

		self::$person["origin"] = randBetween(self::$origins);
	}

	public static function setGender($gender = null)
	{
		if (!is_null($gender))
			return self::$person["gender"] = $gender;

		self::$person["gender"] = randBetween(self::$genders);
	}

	public static function setName($name = null)
	{
		if (!is_null($name))
			return self::$person["name"] = $name;

		self::$person["name"] = ucfirst(strtolower(randBetween(self::$names[self::$person["gender"]])));
	}

	public static function setSurname($surname = null)
	{
		if (!is_null($surname))
			return self::$person["surname"] = $surname;

		self::$person["surname"] = ucfirst(strtolower(randBetween(self::$surnames)));
	}

	public static function setEmail($email = null)
	{
		if (!is_null($email))
			return self::$person["email"] = $email;

		$name = strtolower(self::$person["name"]);
		$surname = strtolower(self::$person["surname"]);
		$mail = randBetween(["gmail", "hotmail", "outlook", "yahoo"]);

		self::$person["email"] = "$name.$surname@$mail.com";
		self::$person["email"] = preg_replace(array("/(á|à|ã|â|ä)/", "/(Á|À|Ã|Â|Ä)/", "/(é|è|ê|ë)/", "/(É|È|Ê|Ë)/", "/(í|ì|î|ï)/", "/(Í|Ì|Î|Ï)/", "/(ó|ò|õ|ô|ö)/", "/(Ó|Ò|Õ|Ô|Ö)/", "/(ú|ù|û|ü)/", "/(Ú|Ù|Û|Ü)/", "/(ñ)/", "/(Ñ)/"), explode(" ", "a A e E i I o O u U n N"), self::$person["email"]);
	}

	public static function setBirthday($birthday = null)
	{
		if (!is_null($birthday))
			return self::$person["birthday"] = $birthday;

		$date = date("d/m/Y", strtotime("-" . rand(0, 43800) . " days"));
		self::$person["birthday"] = $date;
	}

	public static function setAge($age = null)
	{
		if (!is_null($age))
			return self::$person["age"] = $age;

		$now = explode("/", date("d/m/Y"));
		$birthday = explode("/", self::$person["birthday"]);
		$age = $now[2] - $birthday[2];

		$now[0] *= 1;
		$now[1] *= 1;
		$now[2] *= 1;
		$birthday[0] *= 1;
		$birthday[1] *= 1;
		$birthday[2] *= 1;

		if ($now[1] <= $birthday[1]) {
			if ($now[1] < $birthday[1]) {
				$age--;
			} elseif ($now[0] < $birthday[0]) {
				$age--;
			}
		}

		self::$person["age"] = $age;
	}

	public static function setTitle($title = null)
	{
		if (!is_null($title))
			return self::$text["title"] = $title;
	}

	public static function setDescription($description = null)
	{
		if (!is_null($description))
			return self::$text["description"] = $description;
	}

	public static function setContent($content = null)
	{
		if (!is_null($content))
			return self::$text["content"] = $content;
	}

	public static function setBody($body = null)
	{
		if (!is_null($body))
			return self::$text["body"] = $body;
	}

	public static function setPost($post = null)
	{
		if (!is_null($post))
			return self::$text["post"] = $post;
	}

	public static function setComment($comment = null)
	{
		if (!is_null($comment))
			return self::$text["comment"] = $comment;
	}

	public static function setParagraph($paragraph = null)
	{
		if (!is_null($paragraph))
			return self::$text["paragraph"] = $paragraph;
	}


	public static function person()
	{
		self::setGender();
		self::setName();
		self::setSurname();
		self::setEmail();
		self::setBirthday();
		self::setAge();

		return self::getInstance();
	}

	public static function text()
	{
		self::setTitle();
		self::setDescription();
		self::setContent();
		self::setBody();
		self::setPost();
		self::setComment();
		self::setParagraph();

		return self::getInstance();
	}
	
	public static function generate()
	{
		return array_merge(
			["id" => text()->unique()],
			self::$person, 
			self::$text
		);
	}
}